import { useState, useEffect } from 'react';

const LeadFormModal = ({ isOpen, onClose, onSubmit, leadToEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'New',
        value: 0,
    });

    useEffect(() => {
        if (leadToEdit) {
            setFormData({
                title: leadToEdit.title,
                description: leadToEdit.description,
                status: leadToEdit.status,
                value: leadToEdit.value,
            });
        } else {
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
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md border border-slate-700">
                <h2 className="text-2xl font-bold mb-4 text-white">
                    {leadToEdit ? 'Edit Lead' : 'Add New Lead'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input name="title" value={formData.title} onChange={handleChange} placeholder="Lead Title" required className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200 h-24 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"></textarea>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500">
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                            <option value="Lost">Lost</option>
                        </select>
                        <input name="value" type="number" value={formData.value} onChange={handleChange} placeholder="Value" required className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-600 text-slate-200 rounded-md hover:bg-slate-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600">
                            {leadToEdit ? 'Save Changes' : 'Add Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadFormModal;
