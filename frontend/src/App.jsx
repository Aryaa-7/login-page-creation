import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';

import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import UserDashboard from './components/dashboards/userDashboard.jsx';
import AdminDashboard from './components/dashboards/adminDashboard.jsx';

function PrivateRoute({ element, allowedRoles }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  if (loading) return null;
  if (!user) return <Navigate to="/" />;
  if (!allowedRoles.includes(user.role.toUpperCase())) return <Navigate to="/" />;

  return element;
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
  path="/user-dashboard"
  element={<PrivateRoute allowedRoles={['USER']} element={<UserDashboard />} />}
/>
<Route
  path="/admin-dashboard"
  element={<PrivateRoute allowedRoles={['ADMIN']} element={<AdminDashboard />} />}
/>

      </Routes>
    </Router>
  );
}

export default App;
