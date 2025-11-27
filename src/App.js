import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ScheduleLecture from './pages/ScheduleLecture';
import InstructorDashboard from './pages/InstructorDashboard';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>
          } />
          <Route path="/admin/schedule" element={
            <PrivateRoute role="admin"><ScheduleLecture /></PrivateRoute>
          } />
          <Route path="/instructor/dashboard" element={
            <PrivateRoute role="instructor"><InstructorDashboard /></PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;