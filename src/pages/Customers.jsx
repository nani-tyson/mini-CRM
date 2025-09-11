import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} from "../features/customers/customerApiSlice";
import toast from "react-hot-toast";
import CustomerFormModal from "../components/CustomerFormModal";
import { PlusIcon } from '@heroicons/react/24/outline';


const Customers = () => {
  // All your state and logic functions remain the same
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const { data, isLoading, isError, error } = useGetCustomersQuery({ page, search });
  const [addCustomer] = useAddCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const handleAddClick = () => { /* ... same as before ... */ };
  const handleEditClick = (customer) => { /* ... same as before ... */ };
  const handleDeleteClick = async (id) => { /* ... same as before ... */ };
  const handleFormSubmit = async (formData) => { /* ... same as before ... */ };

  let content;

  if (isLoading) {
    content = <p className="text-center mt-8 text-slate-400">Loading customers...</p>;
  } else if (isError) {
    content = <p className="text-center mt-8 text-red-400">Error: {error.toString()}</p>;
  } else {
    content = (
      <>
        {/* --- DESKTOP TABLE VIEW --- */}
        <div className="hidden md:block bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-700">
          <table className="min-w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-slate-300">Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-slate-300">Email</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-slate-300">Phone</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {data.customers.map((customer) => (
                <tr key={customer._id} className="border-b border-slate-700 hover:bg-slate-700">
                  <td className="py-3 px-4">
                    <Link to={`/customers/${customer._id}`} className="text-sky-400 hover:underline font-semibold">
                      {customer.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4">{customer.email}</td>
                  <td className="py-3 px-4">{customer.phone}</td>
                  <td className="py-3 px-4">
                    <button onClick={() => handleEditClick(customer)} className="text-sky-400 hover:underline mr-4">Edit</button>
                    <button onClick={() => handleDeleteClick(customer._id)} className="text-rose-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- MOBILE CARD VIEW --- */}
        <div className="md:hidden space-y-4">
          {data.customers.map((customer) => (
            <div key={customer._id} className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700">
              <Link to={`/customers/${customer._id}`}>
                <h3 className="text-lg font-bold text-sky-400 hover:underline">{customer.name}</h3>
              </Link>
              <p className="text-sm text-slate-400 break-all mt-1">{customer.email}</p>
              <p className="text-sm text-slate-400 mt-1">{customer.phone}</p>
              <div className="mt-4 flex justify-end space-x-4 border-t border-slate-700 pt-4">
                <button onClick={() => handleEditClick(customer)} className="text-sky-400 hover:underline">Edit</button>
                <button onClick={() => handleDeleteClick(customer._id)} className="text-rose-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Customer Management</h1>
        <button onClick={handleAddClick} className="w-full md:w-auto flex items-center justify-center bg-sky-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-sky-600 transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Customer
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        />
      </div>

      {data?.customers.length === 0 && !isLoading 
        ? <div className="text-center mt-8 p-6 bg-slate-800 rounded-lg border border-slate-700"><p className="text-slate-400">No customers found. Add one to get started!</p></div> 
        : content
      }

      {!isLoading && data && data.pages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
          <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="w-full md:w-auto px-4 py-2 bg-slate-700 text-slate-200 rounded-md disabled:opacity-50 hover:bg-slate-600">
            Previous
          </button>
          <span className="text-slate-400">Page {data.page} of {data.pages}</span>
          <button onClick={() => setPage(p => Math.min(p + 1, data.pages))} disabled={page === data.pages} className="w-full md:w-auto px-4 py-2 bg-slate-700 text-slate-200 rounded-md disabled:opacity-50 hover:bg-slate-600">
            Next
          </button>
        </div>
      )}

      <CustomerFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleFormSubmit} customerToEdit={editingCustomer}/>
    </div>
  );
};

export default Customers;