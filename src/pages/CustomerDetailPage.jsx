import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetCustomerByIdQuery } from '../features/customers/customerApiSlice.js';
import {
    useGetLeadsForCustomerQuery,
    useAddLeadMutation,
    useUpdateLeadMutation,
    useDeleteLeadMutation
} from '../features/leads/leadApiSlice.js';
import toast from 'react-hot-toast';
import LeadFormModal from '../components/LeadFormModal.jsx';
import { PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const CustomerDetailPage = () => {
    const { id: customerId } = useParams();

    // --- State and Hooks ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const { data: customer, isLoading: isCustomerLoading, isError: isCustomerError } = useGetCustomerByIdQuery(customerId);
    const { data: leads, isLoading: areLeadsLoading } = useGetLeadsForCustomerQuery(customerId);
    const [addLead] = useAddLeadMutation();
    const [updateLead] = useUpdateLeadMutation();
    const [deleteLead] = useDeleteLeadMutation();

    // --- Handlers ---
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

    if (isCustomerLoading || areLeadsLoading) return <p className="text-center mt-8 text-slate-400">Loading...</p>;
    if (isCustomerError || !customer) return <p className="text-center mt-8 text-red-400">Error loading customer data.</p>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'New': return 'bg-sky-500/20 text-sky-400';
            case 'Contacted': return 'bg-yellow-500/20 text-yellow-400';
            case 'Converted': return 'bg-green-500/20 text-green-400';
            case 'Lost': return 'bg-red-500/20 text-red-400';
            default: return 'bg-slate-500/20 text-slate-400';
        }
    };

    return (
        <div className="space-y-8">
            <Link to="/customers" className="inline-flex items-center text-sky-400 hover:text-sky-300 transition-colors">
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to All Customers
            </Link>

            {/* --- CUSTOMER DETAILS CARD --- */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
                <h1 className="text-3xl font-bold text-white">{customer.name}</h1>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-400">
                    <p><strong className="text-slate-300">Email:</strong> {customer.email}</p>
                    <p><strong className="text-slate-300">Phone:</strong> {customer.phone}</p>
                    <p className="sm:col-span-2"><strong className="text-slate-300">Address:</strong> {customer.address}</p>
                </div>
            </div>

            {/* --- LEADS SECTION --- */}
            <div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-white">Leads / Opportunities</h2>
                    <button onClick={handleAddLeadClick} className="w-full md:w-auto flex items-center justify-center bg-sky-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-sky-600 transition-colors">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add New Lead
                    </button>
                </div>

                {leads && leads.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {leads.map(lead => (
                            <div key={lead._id} className="bg-slate-800 p-5 rounded-lg shadow-lg flex flex-col justify-between border border-slate-700">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-bold text-white">{lead.title}</h3>
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(lead.status)}`}>
                                            {lead.status}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 mt-2">{lead.description}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-700">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-bold text-white">
                                            Value: ${lead.value.toLocaleString()}
                                        </p>
                                        <div className="space-x-4">
                                            <button onClick={() => handleEditLeadClick(lead)} className="text-sky-400 hover:underline text-sm">Edit</button>
                                            <button onClick={() => handleDeleteLeadClick(lead._id)} className="text-rose-500 hover:underline text-sm">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-lg text-center">
                        <p className="text-slate-400">No leads found for this customer. Add one to get started!</p>
                    </div>
                )}
            </div>

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