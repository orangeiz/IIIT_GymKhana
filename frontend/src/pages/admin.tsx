// src/pages/admin.jsx
import Navbar from '../components/navbar';
import { Shield, Calendar, User, CheckCircle, XCircle, Clock, Hash } from 'lucide-react';

export default function AdminPanel() {
  // Mock data — replace with real API later
  const bookingRequests = [
    { id: 101, name: "Rahul Sharma", roll: "21CS045", facility: "Main Cricket Ground", date: "2025-12-05", time: "2:00 PM - 5:00 PM", purpose: "Team Practice", status: "pending" },
    { id: 102, name: "Priya Verma", roll: "22EC012", facility: "Auditorium", date: "2025-12-10", time: "6:00 PM - 9:00 PM", purpose: "Cultural Rehearsal", status: "approved" },
    { id: 103, name: "Amit Kumar", roll: "21ME078", facility: "Indoor Stadium", date: "2025-11-30", time: "9:00 AM - 12:00 PM", purpose: "Badminton Tournament", status: "pending" },
  ];

  const eventRegistrations = [
    { id: 201, name: "Rohan Singh", roll: "21CS101", event: "Inter-College Cricket Tournament", registeredOn: "2025-11-25" },
    { id: 202, name: "Sneha Patel", roll: "22IT056", event: "TechFest 2026 Hackathon", registeredOn: "2025-11-26" },
    { id: 203, name: "Vikram Singh", roll: "21EE089", event: "UTSAV 2026 - Dance Competition", registeredOn: "2025-11-28" },
    { id: 204, name: "Anjali Mehta", roll: "22CS034", event: "National Robotics Championship", registeredOn: "2025-11-27" },
  ];

  const handleApprove = (id: number) => alert(`Approved booking ID: ${id}`);
  const handleReject = (id: number) => alert(`Rejected booking ID: ${id}`);

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
              <Clock className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
              <h3 className="text-4xl font-bold">27</h3>
              <p className="text-gray-400">Pending Requests</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
              <CheckCircle className="w-10 h-10 mx-auto mb-3 text-green-400" />
              <h3 className="text-4xl font-bold">89</h3>
              <p className="text-gray-400">Approved Today</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
              <User className="w-10 h-10 mx-auto mb-3 text-blue-400" />
              <h3 className="text-4xl font-bold">1,247</h3>
              <p className="text-gray-400">Total Registrations</p>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
              <Calendar className="w-10 h-10 mx-auto mb-3 text-purple-400" />
              <h3 className="text-4xl font-bold">12</h3>
              <p className="text-gray-400">Active Events</p>
            </div>
          </div>

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
                        <p className="text-sm text-gray-400">Roll: {req.roll}</p>
                      </div>
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        req.status === 'approved' ? 'bg-green-600' : 'bg-yellow-600'
                      }`}>
                        {req.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <p><strong>Facility:</strong> {req.facility}</p>
                      <p><strong>Date & Time:</strong> {req.date} • {req.time}</p>
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
                      <p className="text-sm text-gray-400">Roll: {reg.roll}</p>
                      <p className="text-purple-300 mt-1">{reg.event}</p>
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