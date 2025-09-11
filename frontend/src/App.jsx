import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Public from './components/Public';
import Private from './components/Private';
import Layout from './components/Layout';

// Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CustomerDetailPage from './pages/CustomerDetailPage';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route element={<Public />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Private Routes */}
        <Route element={<Private />}>
          {/* All private routes will now have the Header and main layout */}
          <Route element={<Layout />}> 
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            {/* Add other private routes here in the future */}
            <Route path="/customers/:id" element={<CustomerDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;