// src/pages/clubs/sports.jsx
import Navbar from '../../components/navbar';
import { Dumbbell, Calendar, MapPin, Users, Mail, Phone, Instagram } from 'lucide-react';
import sportsBg from '../../assets/sports.jpg';

export default function SportsClub() {
  const events = [
    { id: 1, title: "Inter-College Cricket Tournament 2025", date: "15 Dec 2025", venue: "Main Ground", registered: 120 },
    { id: 2, title: "Annual Football League", date: "20 Nov 2025", venue: "Football Field", registered: 96 },
    { id: 3, title: "Badminton Championship", date: "5 Nov 2025", venue: "Indoor Stadium", registered: 64 },
  ];

  // Important Club Members (No Photos)
  const teamMembers = [
    { name: "Arjun Kapoor", role: "President", year: "4th Year", sport: "Cricket Captain", phone: "+91 98765 43210", email: "arjun.sports@college.edu" },
    { name: "Priya Sharma", role: "Vice President", year: "3rd Year", sport: "Football Captain", phone: "+91 87654 32109", email: "priya.sports@college.edu" },
    { name: "Rohan Verma", role: "General Secretary", year: "3rd Year", sport: "Badminton Lead", phone: "+91 76543 21098", email: "rohan.sports@college.edu" },
    { name: "Ananya Singh", role: "Joint Secretary", year: "2nd Year", sport: "Athletics Head", phone: "+91 65432 10987", email: "ananya.sports@college.edu" },
    { name: "Vikram Rao", role: "Treasurer", year: "4th Year", sport: "Chess Captain", phone: "+91 54321 09876", email: "vikram.sports@college.edu" },
    { name: "Neha Gupta", role: "Event Coordinator", year: "3rd Year", sport: "Volleyball Captain", phone: "+91 43210 98765", email: "neha.sports@college.edu" },
  ];

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen">

        {/* Hero */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <img src={sportsBg} alt="Sports" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-br from-red-600 to-orange-700 opacity-90"></div>
          <div className="relative z-10 text-center text-white">
            <Dumbbell className="w-24 h-24 mx-auto mb-6" />
            <h1 className="text-6xl md:text-8xl font-bold">Sports Club</h1>
            <p className="text-2xl mt-4">Play Hard. Win Big.</p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.map(event => (
                <div key={event.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                  <div className="h-48 bg-linear-to-br from-red-500 to-orange-600 flex items-center justify-center">
                    <Calendar className="w-20 h-20 text-white opacity-80" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    <div className="space-y-3 text-gray-600">
                      <p className="flex items-center gap-2"><Calendar className="w-5 h-5" /> {event.date}</p>
                      <p className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {event.venue}</p>
                      <p className="flex items-center gap-2"><Users className="w-5 h-5" /> {event.registered} Registered</p>
                    </div>
                    <a href={`/event/${event.id}`} className="mt-6 block text-center bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition font-medium">
                      View Details & Register
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team – No Photos, Clean Cards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Our Core Team</h2>
              <p className="text-xl text-gray-600">The dedicated leaders behind Sports Club</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="group bg-linear-to-br from-red-50 to-orange-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-red-100"
                >
                  <div className="text-center">
                    {/* Optional: Initials Circle */}
                    <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-lg font-semibold text-red-600 mt-1">{member.role}</p>
                    <p className="text-gray-600 mt-2">{member.year} • {member.sport}</p>

                    {/* Contact Info */}
                    <div className="mt-6 space-y-3">
                      <a href={`tel:${member.phone}`} className="flex items-center justify-center gap-3 text-gray-700 hover:text-red-600 transition">
                        <Phone className="w-5 h-5" /> {member.phone}
                      </a>
                      <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-3 text-gray-700 hover:text-red-600 transition">
                        <Mail className="w-5 h-5" /> {member.email}
                      </a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-4 mt-6">
                      <a href="#" className="bg-red-100 p-3 rounded-full hover:bg-red-200 transition">
                        <Instagram className="w-5 h-5 text-red-600" />
                      </a>
                      <a href="#" className="bg-red-100 p-3 rounded-full hover:bg-red-200 transition">
                        <Mail className="w-5 h-5 text-red-600" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}