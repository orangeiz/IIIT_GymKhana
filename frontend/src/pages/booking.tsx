import Navbar from '../components/navbar';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { bookingsAPI, authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    facility: '',
    date: '',
    timeSlot: '',
    purpose: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authAPI.getUser();
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        rollNumber: user.rollNumber || ''
      }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!authAPI.isAuthenticated()) {
        setMessage({ type: 'error', text: 'Please login to book a facility. Redirecting to login page...' });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }

      await bookingsAPI.create(formData);
      setMessage({ type: 'success', text: 'Booking request submitted successfully!' });
      setFormData({
        name: '',
        rollNumber: '',
        facility: '',
        date: '',
        timeSlot: '',
        purpose: ''
      });
    } catch (error: any) {
      // Handle authentication errors
      if (error.message && error.message.includes('Session expired') || error.message.includes('login')) {
        setMessage({ type: 'error', text: error.message + ' Redirecting to login page...' });
        setTimeout(() => {
          authAPI.logout();
          navigate('/login');
        }, 2000);
      } else {
        setMessage({ type: 'error', text: error.message || 'Failed to submit booking' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="text-center py-16">
          <h1 className="text-6xl font-bold text-gray-800">Book a Facility</h1>
          <p className="text-2xl text-gray-600 mt-4">Ground • Auditorium • Seminar Hall • Labs</p>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-20">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            {!authAPI.isAuthenticated() && (
              <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg">
                <p className="font-semibold">⚠️ Login Required</p>
                <p className="text-sm mt-1">You need to be logged in to submit a booking request. <a href="/login" className="underline font-medium">Click here to login</a></p>
              </div>
            )}
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {message.text}
              </div>
            )}
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-semibold mb-3 items-center gap-2">
                    <User className="w-5 h-5" /> Full Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-3">Roll Number</label>
                  <input 
                    type="text" 
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg" 
                    placeholder="21CS123"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3 items-center gap-2">
                  <MapPin className="w-5 h-5" /> Facility
                </label>
                <select 
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg"
                  value={formData.facility}
                  onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
                  required
                >
                  <option value="">Select a facility</option>
                  <option>Main Sports Ground</option>
                  <option>Auditorium</option>
                  <option>Seminar Hall A</option>
                  <option>Indoor Stadium</option>
                  <option>CSE Lab (Project Work)</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-semibold mb-3  items-center gap-2">
                    <Calendar className="w-5 h-5" /> Date
                  </label>
                  <input 
                    type="date" 
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-3  items-center gap-2">
                    <Clock className="w-5 h-5" /> Time Slot
                  </label>
                  <select 
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    required
                  >
                    <option value="">Select time slot</option>
                    <option>9:00 AM - 12:00 PM</option>
                    <option>2:00 PM - 5:00 PM</option>
                    <option>6:00 PM - 9:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">Purpose</label>
                <textarea 
                  rows={4} 
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg" 
                  placeholder="Practice, Event, Meeting, etc."
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-linear-to-r from-yellow-500 to-orange-600 text-black font-bold text-xl py-5 rounded-xl hover:shadow-2xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}