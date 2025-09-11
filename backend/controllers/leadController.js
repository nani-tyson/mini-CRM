import Lead from '../models/Lead.js';
import Customer from '../models/Customer.js';

// @desc    Add a new lead for a specific customer
// @route   POST /api/customers/:customerId/leads
// @access  Private
export const addLead = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { title, description, status, value } = req.body;

    // First, verify the customer exists and belongs to the user
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Create the new lead
    const lead = new Lead({
      customer: customerId,
      user: req.user.id,
      title,
      description,
      status,
      value,
    });

    const createdLead = await lead.save();
    res.status(201).json(createdLead);
  } catch (error) {
    res.status(400).json({ message: 'Error adding lead', error: error.message });
  }
};

// @desc    Get all leads for a specific customer
// @route   GET /api/customers/:customerId/leads
// @access  Private
export const getLeadsForCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Verify the customer exists and belongs to the user
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Find all leads associated with this customer
    const leads = await Lead.find({ customer: customerId });
    res.json(leads);
  } catch (error) {
     res.status(500).json({ message: 'Server Error' });
  }
};


// @desc    Get a single lead by its ID
// @route   GET /api/customers/:customerId/leads/:leadId
// @access  Private
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.leadId);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Security Check: Ensure the lead belongs to the logged-in user
    if (lead.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc    Update a lead
// @route   PUT /api/customers/:customerId/leads/:leadId
// @access  Private
export const updateLead = async (req, res) => {
  try {
    let lead = await Lead.findById(req.params.leadId);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Security Check: Ensure the lead belongs to the logged-in user
    if (lead.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    lead = await Lead.findByIdAndUpdate(req.params.leadId, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: 'Error updating lead', error: error.message });
  }
};


// @desc    Delete a lead
// @route   DELETE /api/customers/:customerId/leads/:leadId
// @access  Private
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.leadId);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    // Security Check: Ensure the lead belongs to the logged-in user
    if (lead.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await lead.deleteOne();
    
    res.json({ message: 'Lead removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};