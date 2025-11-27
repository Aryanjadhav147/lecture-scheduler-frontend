import { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function ScheduleLecture() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    courseId: '', instructorId: '', date: '', startTime: '', endTime: '', topic: ''
  });

  useEffect(() => {
    api.get('/admin/courses').then(res => setCourses(res.data));
    api.get('/admin/instructors').then(res => setInstructors(res.data));
  }, []);

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    // For this simple version, we let admin manually pick instructor 
    // OR you can auto-select if you assigned instructors to courses in DB
    setForm({ ...form, courseId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/lectures', form);
      alert('Lecture Scheduled Successfully!');
      setForm({ ...form, date: '', startTime: '', endTime: '', topic: '' }); // Reset partial
    } catch (err) {
      alert(err.response?.data?.msg || 'Error scheduling lecture. Check for conflicts.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6 flex justify-center">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Schedule a Lecture</h2>
                <button onClick={() => navigate('/admin/dashboard')} className="text-blue-600 underline">Back to Dashboard</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <select className="w-full mt-1 p-2 border rounded" onChange={handleCourseChange} required>
                        <option value="">Select Course</option>
                        {courses.map(c => <option key={c._id} value={c._id}>{c.courseName} ({c.courseCode})</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Instructor</label>
                    <select 
                        className="w-full mt-1 p-2 border rounded" 
                        onChange={(e) => setForm({...form, instructorId: e.target.value})}
                        required
                    >
                        <option value="">Assign Instructor</option>
                        {instructors.map(i => <option key={i._id} value={i._id}>{i.name} ({i.email})</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" className="w-full mt-1 p-2 border rounded" 
                            onChange={e => setForm({...form, date: e.target.value})} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Topic</label>
                        <input type="text" className="w-full mt-1 p-2 border rounded" 
                            onChange={e => setForm({...form, topic: e.target.value})} required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input type="time" className="w-full mt-1 p-2 border rounded" 
                            onChange={e => setForm({...form, startTime: e.target.value})} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Time</label>
                        <input type="time" className="w-full mt-1 p-2 border rounded" 
                            onChange={e => setForm({...form, endTime: e.target.value})} required />
                    </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 mt-6">
                    Confirm Schedule
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}