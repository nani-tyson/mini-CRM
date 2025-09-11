import { useState } from 'react';
import { 
    useGetCustomersQuery,
    useAddCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation
} from '../features/customers/customerApiSlice';
import toast from 'react-hot-toast';
import CustomerFormModal from '../components/CustomerFormModal';

const Customers = () => {
    // State for pagination and search
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);

    // RTK Query Hooks
    const { data, isLoading, isError, error } = useGetCustomersQuery({ page, search });
    const [addCustomer] = useAddCustomerMutation();
    const [updateCustomer] = useUpdateCustomerMutation();
    const [deleteCustomer] = useDeleteCustomerMutation();

    const handleAddClick = () => {
        setEditingCustomer(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (customer) => {
        setEditingCustomer(customer);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await deleteCustomer(id).unwrap();
                toast.success('Customer deleted successfully');
            } catch (err) {
                toast.error('Failed to delete customer');
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingCustomer) {
                await updateCustomer({ id: editingCustomer._id, ...formData }).unwrap();
                toast.success('Customer updated successfully');
            } else {
                await addCustomer(formData).unwrap();
                toast.success('Customer added successfully');
            }
            setIsModalOpen(false);
        } catch (err) {
            toast.error(err.data?.message || 'An error occurred');
        }
    };
    
    let content;

    if (isLoading) {
        content = <p className="text-center mt-8">Loading customers...</p>;
    } else if (isError) {
        content = <p className="text-center mt-8 text-red-500">Error: {error.toString()}</p>;
    } else {
        content = (
            <>
                {/* --- DESKTOP TABLE VIEW (Hidden on mobile) --- */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full bg-white">
                       <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Phone</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {data.customers.map((customer) => (
                                <tr key={customer._id} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-4">{customer.name}</td>
                                    <td className="py-3 px-4">{customer.email}</td>
                                    <td className="py-3 px-4">{customer.phone}</td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => handleEditClick(customer)} className="text-blue-500 hover:underline mr-4">Edit</button>
                                        <button onClick={() => handleDeleteClick(customer._id)} className="text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- MOBILE CARD VIEW (Hidden on medium screens and up) --- */}
                <div className="md:hidden space-y-4">
                    {data.customers.map((customer) => (
                        <div key={customer._id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-bold">{customer.name}</h3>
                            <p className="text-sm text-gray-600 break-all">{customer.email}</p>
                            <p className="text-sm text-gray-600">{customer.phone}</p>
                            <div className="mt-4 flex justify-end space-x-4">
                                <button onClick={() => handleEditClick(customer)} className="text-blue-500 hover:underline">Edit</button>
                                <button onClick={() => handleDeleteClick(customer._id)} className="text-red-500 hover:underline">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    return (
        <div>
            {/* --- RESPONSIVE HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold">Customer Management</h1>
                <button onClick={handleAddClick} className="w-full md:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Customer
                </button>
            </div>
            
            <div className="mb-4">
                <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-2 border rounded"/>
            </div>
            
            {data?.customers.length === 0 && !isLoading ? <p className="text-center mt-8">No customers found. Add one to get started!</p> : content}
            
            {/* --- RESPONSIVE PAGINATION --- */}
            {!isLoading && data && data.pages > 1 && (
                 <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
                    <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="w-full md:w-auto px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
                        Previous
                    </button>
                    <span>Page {data.page} of {data.pages}</span>
                    <button onClick={() => setPage(p => Math.min(p + 1, data.pages))} disabled={page === data.pages} className="w-full md:w-auto px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
                        Next
                    </button>
                </div>
            )}

            <CustomerFormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                customerToEdit={editingCustomer}
            />
        </div>
    );
};

export default Customers;