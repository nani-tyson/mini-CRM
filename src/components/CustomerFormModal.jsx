import { useState, useEffect } from 'react';

const CustomerFormModal = ({ isOpen, onClose, onSubmit, customerToEdit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (customerToEdit) {
      setFormData(customerToEdit);
    } else {
      setFormData({ name: '', email: '', phone: '', address: '' });
    }
  }, [customerToEdit, isOpen]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-slate-800 p-6 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-white">
          {customerToEdit ? 'Edit Customer' : 'Add New Customer'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
            >
              {customerToEdit ? 'Save Changes' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerFormModal;
