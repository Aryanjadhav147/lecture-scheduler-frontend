import { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

export default function InstructorDashboard() {
  const [lectures, setLectures] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;
    
    api.get('/instructor/lectures')
      .then(res => {
         // Filter: Keep lectures where instructorId matches logged-in User ID
         // We handle both cases: if ID is a string OR if it's an object (populated)
         const myLectures = res.data.filter(l => {
             const lectureInstId = l.instructorId?._id || l.instructorId;
             return lectureInstId === user.id;
         });
         setLectures(myLectures);
      })
      .catch(console.error);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">My Scheduled Lectures</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-100 border-b">
                    <tr>
                        <th className="p-4">Date</th>
                        <th className="p-4">Time</th>
                        <th className="p-4">Course</th>
                        <th className="p-4">Topic</th>
                    </tr>
                </thead>
                <tbody>
                    {lectures.length === 0 ? (
                        <tr><td colSpan="4" className="p-4 text-center text-gray-500">No lectures assigned yet.</td></tr>
                    ) : (
                        lectures.map(l => (
                            <tr key={l._id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{new Date(l.date).toLocaleDateString()}</td>
                                <td className="p-4">{l.startTime} - {l.endTime}</td>
                                {/* FIX: Display courseName safely */}
                                <td className="p-4 font-semibold text-blue-600">
                                    {l.courseId?.courseName || 'Unknown Course'}
                                </td>
                                <td className="p-4">{l.topic}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}