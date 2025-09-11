import { useState, useEffect } from 'react';

const LeadFormModal = ({ isOpen, onClose, onSubmit, leadToEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'New',
        value: 0,
    });

    // If we pass a lead to edit, populate the form with its data
    useEffect(() => {
        if (leadToEdit) {
            setFormData({
                title: leadToEdit.title,
                description: leadToEdit.description,
                status: leadToEdit.status,
                value: leadToEdit.value,
            });
        } else {
            // Otherwise, reset the form for adding a new lead
            setFormData({ title: '', description: '', status: 'New', value: 0 });
        }
    }, [leadToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'value' ? Number(value) : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                    {leadToEdit ? 'Edit Lead' : 'Add New Lead'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="Lead Title" required className="w-full p-2 border rounded"/>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded h-24"></textarea>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
                        </select>
                        <input name="value" type="number" value={formData.value} onChange={handleChange} placeholder="Value" required className="w-full p-2 border rounded"/>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            {leadToEdit ? 'Save Changes' : 'Add Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadFormModal;
