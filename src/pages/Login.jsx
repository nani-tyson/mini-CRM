import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { setCredentials } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // This response will contain the token from our backend
            const response = await login({ email, password }).unwrap();
            
            // We use the dispatch function to send the action with the token to our authSlice
            dispatch(setCredentials({ token: response.token })); // Assuming backend returns { token: '...' }
            
            toast.success('Login successful!');
            navigate('/'); // Navigate to the dashboard
        } catch (err) {
            toast.error(err.data?.msg || 'Login failed');
        }
    };

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={handleChange} required className="block w-full px-3 py-2 mt-1 border rounded-md" />
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={handleChange} required className="block w-full px-3 py-2 mt-1 border rounded-md" />
          </div>
          <button type="submit" disabled={isLoading} className="flex justify-center w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
         <p className="text-sm text-center text-gray-600">
            Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
