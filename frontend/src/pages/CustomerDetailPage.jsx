import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetCustomerByIdQuery } from '../features/customers/customerApiSlice';
import { 
    useGetLeadsForCustomerQuery,
    useAddLeadMutation,
    useUpdateLeadMutation,
    useDeleteLeadMutation
} from '../features/leads/leadApiSlice';
import toast from 'react-hot-toast';
import LeadFormModal from '../components/LeadFormModal';

const CustomerDetailPage = () => {
    const { id: customerId } = useParams();

    // --- STATE FOR MODAL ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState(null);

    // --- RTK QUERY HOOKS (QUERIES) ---
    const { data: customer, isLoading: isCustomerLoading, isError: isCustomerError } = useGetCustomerByIdQuery(customerId);
    const { data: leads, isLoading: areLeadsLoading } = useGetLeadsForCustomerQuery(customerId);

    // --- RTK QUERY HOOKS (MUTATIONS) ---
    const [addLead] = useAddLeadMutation();
    const [updateLead] = useUpdateLeadMutation();
    const [deleteLead] = useDeleteLeadMutation();

    // --- HANDLER FUNCTIONS ---
    const handleAddLeadClick = () => {
        setEditingLead(null);
        setIsModalOpen(true);
    };

    const handleEditLeadClick = (lead) => {
        setEditingLead(lead);
        setIsModalOpen(true);
    };

    const handleDeleteLeadClick = async (leadId) => {
        if (window.confirm('Are you sure you want to delete this lead?')) {
            try {
                await deleteLead({ customerId, leadId }).unwrap();
                toast.success('Lead deleted successfully');
            } catch (err) {
                toast.error('Failed to delete lead');
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingLead) {
                await updateLead({ customerId, leadId: editingLead._id, ...formData }).unwrap();
                toast.success('Lead updated successfully');
            } else {
                await addLead({ customerId, ...formData }).unwrap();
                toast.success('Lead added successfully');
            }
            setIsModalOpen(false);
        } catch (err) {
            toast.error(err.data?.message || 'An error occurred');
        }
    };

    // ... (Loading/Error handling and getStatusColor function remain the same)
    if (isCustomerLoading || areLeadsLoading) return <p className="text-center mt-8">Loading...</p>;
    if (isCustomerError || !customer) return <p className="text-center mt-8 text-red-500">Error loading customer data.</p>;
    const getStatusColor = (status) => { /* ... */ };


    return (
        <div>
            <Link to="/customers" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to All Customers</Link>

            {/* --- CUSTOMER DETAILS CARD --- */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phone}</p>
                    <p className="sm:col-span-2"><strong>Address:</strong> {customer.address}</p>
                </div>
            </div>

            {/* --- LEADS SECTION --- */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Leads / Opportunities</h2>
                    <button onClick={handleAddLeadClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add New Lead
                    </button>
                </div>

                {leads && leads.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {leads.map(lead => (
                            <div key={lead._id} className="bg-white p-5 rounded-lg shadow-md flex flex-col justify-between">
                                {/* ... Lead card content ... */}
                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-bold text-gray-800">Value: ${lead.value.toLocaleString()}</p>
                                        <div className="space-x-2">
                                            <button onClick={() => handleEditLeadClick(lead)} className="text-blue-500 hover:underline text-sm">Edit</button>
                                            <button onClick={() => handleDeleteLeadClick(lead._id)} className="text-red-500 hover:underline text-sm">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-gray-500">No leads found for this customer. Add one to get started!</p>
                    </div>
                )}
            </div>

            {/* --- MODAL --- */}
            <LeadFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                leadToEdit={editingLead}
            />
        </div>
    );
};

export default CustomerDetailPage;