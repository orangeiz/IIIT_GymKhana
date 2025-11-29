import Navbar from '../components/navbar';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

export default function Booking() {
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
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-lg font-semibold mb-3 items-center gap-2">
                    <User className="w-5 h-5" /> Full Name
                  </label>
                  <input type="text" className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-3">Roll Number</label>
                  <input type="text" className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg" placeholder="21CS123" />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3 items-center gap-2">
                  <MapPin className="w-5 h-5" /> Facility
                </label>
                <select className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg">
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
                  <input type="date" className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg" />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-3  items-center gap-2">
                    <Clock className="w-5 h-5" /> Time Slot
                  </label>
                  <select className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg">
                    <option>9:00 AM - 12:00 PM</option>
                    <option>2:00 PM - 5:00 PM</option>
                    <option>6:00 PM - 9:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold mb-3">Purpose</label>
                <textarea rows={4} className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg" placeholder="Practice, Event, Meeting, etc."></textarea>
              </div>

              <button type="submit" className="w-full bg-linear-to-r from-yellow-500 to-orange-600 text-black font-bold text-xl py-5 rounded-xl hover:shadow-2xl transition transform hover:scale-105">
                Submit Booking Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}