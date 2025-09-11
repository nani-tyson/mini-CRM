import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import Public from './components/Public';
import Private from './components/Private';

// Pages
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

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
          <Route path="/" element={<Dashboard />} />
          {/* Add other private routes here, e.g., for customers */}
        </Route>
      </Routes>
    </>
  );
}

export default App;