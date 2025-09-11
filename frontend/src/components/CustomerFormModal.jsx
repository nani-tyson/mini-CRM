import { useState, useEffect } from 'react';

const CustomerFormModal = ({ isOpen, onClose, onSubmit, customerToEdit }) => {
    // ... logic remains the same
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                    {customerToEdit ? 'Edit Customer' : 'Add New Customer'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border rounded"/>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 border rounded"/>
                        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required className="w-full p-2 border rounded"/>
                        <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="w-full p-2 border rounded"/>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            {customerToEdit ? 'Save Changes' : 'Add Customer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerFormModal;