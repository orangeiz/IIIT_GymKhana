// src/pages/admin.tsx
import Navbar from '../components/navbar';
import { Shield, Calendar, User, CheckCircle, XCircle, Clock, Hash } from 'lucide-react';
import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function AdminPanel() {
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);
  const [eventRegistrations, setEventRegistrations] = useState<any[]>([]);
  const [stats, setStats] = useState({
    pendingRequests: 0,
    approvedToday: 0,
    totalRegistrations: 0,
    activeEvents: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authAPI.getUser();
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookings, registrations, statsData] = await Promise.all([
        adminAPI.getBookings(),
        adminAPI.getRegistrations(4),
        adminAPI.getStats()
      ]);
      setBookingRequests(bookings);
      setEventRegistrations(registrations);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await adminAPI.approveBooking(id);
      await fetchData();
    } catch (error: any) {
      alert(error.message || 'Failed to approve booking');
    }
  };

  const handleReject = async (id: number) => {
    if (!confirm('Are you sure you want to reject this booking?')) return;
    try {
      await adminAPI.rejectBooking(id);
      await fetchData();
    } catch (error: any) {
      alert(error.message || 'Failed to reject booking');
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <Shield className="w-14 h-14 text-yellow-400" />
            <h1 className="text-5xl md:text-6xl font-bold">Admin Dashboard</h1>
          </div>

          {/* Quick Stats */}
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
                <Clock className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
                <h3 className="text-4xl font-bold">{stats.pendingRequests}</h3>
                <p className="text-gray-400">Pending Requests</p>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
                <CheckCircle className="w-10 h-10 mx-auto mb-3 text-green-400" />
                <h3 className="text-4xl font-bold">{stats.approvedToday}</h3>
                <p className="text-gray-400">Approved Today</p>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
                <User className="w-10 h-10 mx-auto mb-3 text-blue-400" />
                <h3 className="text-4xl font-bold">{stats.totalRegistrations}</h3>
                <p className="text-gray-400">Total Registrations</p>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
                <Calendar className="w-10 h-10 mx-auto mb-3 text-purple-400" />
                <h3 className="text-4xl font-bold">{stats.activeEvents}</h3>
                <p className="text-gray-400">Active Events</p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Facility Booking Requests */}
            <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Hash className="w-8 h-8 text-yellow-400" />
                Facility Booking Requests
              </h2>
              <div className="space-y-6">
                {bookingRequests.map((req) => (
                  <div key={req.id} className="bg-gray-900/80 border border-gray-700 rounded-2xl p-6 hover:border-yellow-600 transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xl font-semibold">{req.name}</p>
                        <p className="text-sm text-gray-400">Roll: {req.rollNumber}</p>
                      </div>
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        req.status === 'approved' ? 'bg-green-600' : req.status === 'rejected' ? 'bg-red-600' : 'bg-yellow-600'
                      }`}>
                        {req.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p><strong>Facility:</strong> {req.facility}</p>
                      <p><strong>Date & Time:</strong> {req.date} • {req.timeSlot}</p>
                      <p><strong>Purpose:</strong> {req.purpose}</p>
                    </div>
                    {req.status === 'pending' && (
                      <div className="flex gap-3 mt-5">
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5" /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-5 h-5" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Event Registrations */}
            <div className="bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-400" />
                Event Registrations (Latest)
              </h2>
              <div className="space-y-5">
                {eventRegistrations.map((reg) => (
                  <div key={reg.id} className="bg-gray-900/80 border border-gray-700 rounded-2xl p-5 hover:border-purple-600 transition flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">{reg.name}</p>
                      <p className="text-sm text-gray-400">Roll: {reg.rollNumber}</p>
                      <p className="text-purple-300 mt-1">{reg.eventTitle}</p>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <p>Registered</p>
                      <p className="text-xs">{reg.registeredOn}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-semibold transition">
                View All Registrations →
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}