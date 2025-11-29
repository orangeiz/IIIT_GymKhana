// src/pages/clubs/cultural.jsx
import Navbar from '../../components/navbar';
import { Music, Calendar, MapPin, Users, Mail, Phone, Instagram, Mic2 } from 'lucide-react';
import culturalBg from '../../assets/cultural.jpg';

export default function CulturalClub() {
  const events = [
    { id: 7, title: "UTSAV 2026 – Annual Cultural Fest", date: "20–22 Feb 2026", venue: "Open Air Theatre", registered: 1200 },
    { id: 8, title: "Diwali Night", date: "8 Nov 2025", venue: "Auditorium", registered: 890 },
    { id: 9, title: "Freshers Dance Competition", date: "12 Oct 2025", venue: "Main Stage", registered: 320 },
  ];

  // Core Team Members (No Photos)
  const teamMembers = [
    { name: "Aditi Sharma", role: "President", year: "4th Year", domain: "Dance & Choreography", phone: "+91 98765 55555", email: "aditi.cultural@college.edu", instagram: "instagram.com/aditi_dance" },
    { name: "Karan Malhotra", role: "Vice President", year: "3rd Year", domain: "Music & Singing", phone: "+91 87654 44444", email: "karan.cultural@college.edu", instagram: "instagram.com/karan_sings" },
    { name: "Riya Kapoor", role: "General Secretary", year: "3rd Year", domain: "Drama & Theatre", phone: "+91 76543 33333", email: "riya.cultural@college.edu", instagram: "instagram.com/riya_drama" },
    { name: "Arnav Singh", role: "Event Head", year: "4th Year", domain: "Fashion & Ramp Walk", phone: "+91 65432 22222", email: "arnav.cultural@college.edu", instagram: "instagram.com/arnav_fashion" },
    { name: "Nisha Verma", role: "Creative Head", year: "2nd Year", domain: "Art & Photography", phone: "+91 54321 11111", email: "nisha.cultural@college.edu", instagram: "instagram.com/nisha_art" },
    { name: "Siddhant Rao", role: "Media & PR Head", year: "3rd Year", domain: "Videography & Reels", phone: "+91 43210 99999", email: "siddhant.cultural@college.edu", instagram: "instagram.com/siddhant_reels" },
  ];

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen">

        {/* Hero */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <img src={culturalBg} alt="Cultural Club" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-br from-purple-600 to-pink-600 opacity-90"></div>
          <div className="relative z-10 text-center text-white">
            <Music className="w-24 h-24 mx-auto mb-6" />
            <h1 className="text-6xl md:text-8xl font-bold">Cultural Club</h1>
            <p className="text-2xl mt-4">Celebrate. Perform. Shine.</p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.map(event => (
                <div key={event.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                  <div className="h-48 bg-linear-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Music className="w-20 h-20 text-white opacity-80" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    <div className="space-y-3 text-gray-600">
                      <p className="flex items-center gap-2"><Calendar className="w-5 h-5" /> {event.date}</p>
                      <p className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {event.venue}</p>
                      <p className="flex items-center gap-2"><Users className="w-5 h-5" /> {event.registered} Registered</p>
                    </div>
                    <a href={`/event/${event.id}`} className="mt-6 block text-center bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition font-medium">
                      View Details & Register
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Team Section – No Photos */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Our Core Team</h2>
              <p className="text-xl text-gray-600">The artists and performers who light up the stage</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="group bg-linear-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-purple-100"
                >
                  <div className="text-center">
                    {/* Initials Circle with Music Note */}
                    <div className="relative w-24 h-24 mx-auto mb-6 bg-linear-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                      <Mic2 className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 opacity-80" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-lg font-semibold text-purple-600 mt-1">{member.role}</p>
                    <p className="text-gray-600 mt-2">{member.year} • {member.domain}</p>

                    <p className="text-sm text-gray-500 mt-1">Instagram: {member.instagram.split('/').pop()}</p>

                    {/* Contact */}
                    <div className="mt-6 space-y-3">
                      <a href={`tel:${member.phone}`} className="flex items-center justify-center gap-3 text-gray-700 hover:text-purple-600 transition">
                        <Phone className="w-5 h-5" /> {member.phone}
                      </a>
                      <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-3 text-gray-700 hover:text-purple-600 transition">
                        <Mail className="w-5 h-5" /> {member.email}
                      </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4 mt-6">
                      <a href={`https://${member.instagram}`} target="_blank" rel="noopener noreferrer" className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition">
                        <Instagram className="w-5 h-5 text-purple-700" />
                      </a>
                      <a href="#" className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition">
                        <Mail className="w-5 h-5 text-purple-700" />
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