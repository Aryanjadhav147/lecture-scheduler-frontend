import { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Form States
  const [newInst, setNewInst] = useState({ name: '', email: '', password: '' });
  const [newCourse, setNewCourse] = useState({ courseName: '', courseCode: '', description: '', level: '', image: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [instRes, courseRes] = await Promise.all([
        api.get('/admin/instructors'),
        api.get('/admin/courses')
      ]);
      setInstructors(instRes.data);
      setCourses(courseRes.data);
    } catch (err) { console.error(err); }
  };

  const addInstructor = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/instructors', newInst);
      alert('Instructor Added');
      fetchData();
      setNewInst({ name: '', email: '', password: '' });
    } catch (err) { alert('Error adding instructor'); }
  };

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/courses', newCourse);
      alert('Course Added');
      fetchData();
      setNewCourse({ courseName: '', courseCode: '', description: '', level: '', image: '' });
    } catch (err) { alert('Error adding course'); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* INSTRUCTORS PANEL */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-bold mb-4">Instructors ({instructors.length})</h3>
          <form onSubmit={addInstructor} className="mb-6 p-4 bg-gray-50 rounded border">
            <h4 className="font-semibold mb-2 text-sm text-gray-600">Add New Instructor</h4>
            <input className="w-full mb-2 p-2 border rounded" placeholder="Name" value={newInst.name} onChange={e => setNewInst({...newInst, name: e.target.value})} required />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Email" type="email" value={newInst.email} onChange={e => setNewInst({...newInst, email: e.target.value})} required />
            <input className="w-full mb-2 p-2 border rounded" placeholder="Password" type="password" value={newInst.password} onChange={e => setNewInst({...newInst, password: e.target.value})} required />
            <button className="bg-green-600 text-white px-4 py-2 rounded text-sm w-full">Add Instructor</button>
          </form>
          <div className="overflow-auto max-h-60">
            <table className="w-full text-left text-sm">
              <thead><tr className="border-b"><th className="p-2">Name</th><th className="p-2">Email</th></tr></thead>
              <tbody>
                {instructors.map(i => <tr key={i._id} className="border-b"><td className="p-2">{i.name}</td><td className="p-2">{i.email}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>

        {/* COURSES PANEL */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-bold mb-4">Courses ({courses.length})</h3>
          <form onSubmit={addCourse} className="mb-6 p-4 bg-gray-50 rounded border">
             <h4 className="font-semibold mb-2 text-sm text-gray-600">Add New Course</h4>
             <input className="w-full mb-2 p-2 border rounded" placeholder="Course Name" value={newCourse.courseName} onChange={e => setNewCourse({...newCourse, courseName: e.target.value})} required />
             <input className="w-full mb-2 p-2 border rounded" placeholder="Code (e.g. CS101)" value={newCourse.courseCode} onChange={e => setNewCourse({...newCourse, courseCode: e.target.value})} required />
             <input className="w-full mb-2 p-2 border rounded" placeholder="Level" value={newCourse.level} onChange={e => setNewCourse({...newCourse, level: e.target.value})} />
             <input className="w-full mb-2 p-2 border rounded" placeholder="Description" value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} />
             <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm w-full">Add Course</button>
          </form>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-auto">
             {courses.map(c => (
               <div key={c._id} className="border p-2 rounded text-sm">
                 <div className="font-bold">{c.courseName}</div>
                 <div className="text-gray-500 text-xs">{c.courseCode}</div>
               </div>
             ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 pb-6">
        <button onClick={() => navigate('/admin/schedule')} className="w-full bg-indigo-600 text-white py-4 rounded-lg text-lg font-bold shadow hover:bg-indigo-700">
            Go to Lecture Scheduler →
        </button>
      </div>
    </div>
  );
}