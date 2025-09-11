import Customer from '../models/Customer.js';
import Lead from '../models/Lead.js';
import mongoose from 'mongoose';

// @desc    Get dashboard statistics for a user
// @route   GET /api/stats
// @access  Private
export const getStats = async (req, res) => {
    try {
        const userId = req.user._id;

        // --- STATS WE ALREADY HAVE ---
        const totalCustomers = await Customer.countDocuments({ user: userId });
        const totalLeads = await Lead.countDocuments({ user: userId });

        const convertedLeadsValueResult = await Lead.aggregate([
            { $match: { user: userId, status: 'Converted' } },
            { $group: { _id: null, totalValue: { $sum: '$value' } } }
        ]);
        const convertedLeadsValue = convertedLeadsValueResult.length > 0 ? convertedLeadsValueResult[0].totalValue : 0;

        const leadStatusDistributionResult = await Lead.aggregate([
            { $match: { user: userId } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);
        const leadStatusDistribution = leadStatusDistributionResult.reduce((acc, item) => {
            acc[item._id] = item.count;
            return acc;
        }, {});

        // --- *** NEW: MONTHLY PERFORMANCE AGGREGATION *** ---
        const monthlyPerformanceResult = await Lead.aggregate([
            // Stage 1: Match all leads for the current user
            { $match: { user: userId } },
            // Stage 2: Group leads by the year and month they were created
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    // Count total leads in each group (month)
                    totalLeads: { $sum: 1 },
                    // Sum the value of leads ONLY if their status is 'Converted'
                    convertedValue: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "Converted"] }, "$value", 0]
                        }
                    }
                }
            },
            // Stage 3: Sort the results by year, then month
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            // Stage 4: Limit to the last 12 months (optional but good for performance)
            { $limit: 12 },
            // Stage 5: Project the fields into a more friendly format
             {
                $project: {
                    _id: 0, // Exclude the default _id field
                    month: "$_id.month",
                    year: "$_id.year",
                    totalLeads: 1,
                    convertedValue: 1
                }
            }
        ]);
        
        // --- SEND THE FINAL, COMBINED STATS OBJECT ---
        res.json({
            totalCustomers,
            totalLeads,
            convertedLeadsValue,
            leadStatusDistribution,
            monthlyPerformance: monthlyPerformanceResult, // <-- New data included
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};