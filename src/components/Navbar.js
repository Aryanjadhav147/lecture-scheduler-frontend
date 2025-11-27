import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">Lecture Scheduler</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Welcome, {user?.role === 'admin' ? 'Admin' : 'Instructor'}</span>
        <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">Logout</button>
      </div>
    </div>
  );
}