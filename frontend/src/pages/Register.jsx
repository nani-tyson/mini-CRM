import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../features/auth/authApiSlice.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice.js';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const { name, email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register({ name, email, password }).unwrap();
            dispatch(setCredentials(response));
            toast.success('Registration successful! Welcome.');
            navigate('/');
        } catch (err) {
            toast.error(err.data?.msg || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 px-4 font-sans">
            <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
                <h2 className="text-3xl font-bold text-center text-white">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={handleChange} required className="mt-1 block w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={handleChange} required className="mt-1 block w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={handleChange} required minLength="6" className="mt-1 block w-full p-2 bg-slate-700 border border-slate-600 rounded text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
                    </div>
                    <button type="submit" disabled={isLoading} className="flex justify-center w-full px-4 py-2 font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600 disabled:bg-sky-400/50 disabled:cursor-not-allowed">
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="text-sm text-center text-slate-400">
                    Already have an account? <Link to="/login" className="font-medium text-sky-400 hover:text-sky-300">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;