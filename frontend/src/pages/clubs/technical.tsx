// src/pages/clubs/technical.jsx
import Navbar from '../../components/navbar';
import { Code, Calendar, MapPin, Users, Mail, Phone, Github, Linkedin } from 'lucide-react';
import techBg from '../../assets/technical.png';

export default function TechnicalClub() {
  const events = [
    { id: 4, title: "TechFest 2026", date: "10–12 Jan 2026", venue: "Engineering Block", registered: 450 },
    { id: 5, title: "National Level Hackathon", date: "28 Dec 2025", venue: "CSE Lab", registered: 280 },
    { id: 6, title: "Robotics Workshop", date: "18 Nov 2025", venue: "Mech Lab", registered: 85 },
  ];

  // Core Team Members (No Photos)
  const teamMembers = [
    { name: "Aryan Patel", role: "President", year: "4th Year", domain: "Full Stack & AI Lead", phone: "+91 98765 11111", email: "aryan.tech@college.edu", github: "github.com/aryanpatel" },
    { name: "Sanya Gupta", role: "Vice President", year: "3rd Year", domain: "Web Dev & UI/UX", phone: "+91 87654 22222", email: "sanya.tech@college.edu", github: "github.com/sanyagupta" },
    { name: "Rahul Mehta", role: "General Secretary", year: "3rd Year", domain: "Competitive Programming", phone: "+91 76543 33333", email: "rahul.tech@college.edu", github: "github.com/rahulcp" },
    { name: "Isha Singh", role: "Technical Head", year: "4th Year", domain: "Machine Learning", phone: "+91 65432 44444", email: "isha.tech@college.edu", github: "github.com/ishaml" },
    { name: "Vivek Kumar", role: "Event Coordinator", year: "3rd Year", domain: "Cybersecurity", phone: "+91 54321 55555", email: "vivek.tech@college.edu", github: "github.com/vivekcyber" },
    { name: "Pooja Sharma", role: "Design & Media Head", year: "2nd Year", domain: "Graphics & Video", phone: "+91 43210 66666", email: "pooja.tech@college.edu", github: "github.com/poojadesign" },
  ];

  return (
    <>
      <Navbar />

      <div className="pt-24 min-h-screen">

        {/* Hero */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <img src={techBg} alt="Technical Club" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-cyan-600 opacity-90"></div>
          <div className="relative z-10 text-center text-white">
            <Code className="w-24 h-24 mx-auto mb-6" />
            <h1 className="text-6xl md:text-8xl font-bold">Technical Club</h1>
            <p className="text-2xl mt-4">Innovate. Code. Conquer.</p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16 text-gray-800">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.map(event => (
                <div key={event.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                  <div className="h-48 bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <Code className="w-20 h-20 text-white opacity-80" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    <div className="space-y-3 text-gray-600">
                      <p className="flex items-center gap-2"><Calendar className="w-5 h-5" /> {event.date}</p>
                      <p className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {event.venue}</p>
                      <p className="flex items-center gap-2"><Users className="w-5 h-5" /> {event.registered} Registered</p>
                    </div>
                    <a href={`/event/${event.id}`} className="mt-6 block text-center bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition font-medium">
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
              <p className="text-xl text-gray-600">The brilliant minds powering innovation</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="group bg-linear-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-blue-100"
                >
                  <div className="text-center">
                    {/* Initials Circle */}
                    <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                    <p className="text-lg font-semibold text-blue-600 mt-1">{member.role}</p>
                    <p className="text-gray-600 mt-2">{member.year} • {member.domain}</p>

                    <p className="text-sm text-gray-500 mt-1">GitHub: {member.github}</p>

                    {/* Contact */}
                    <div className="mt-6 space-y-3">
                      <a href={`tel:${member.phone}`} className="flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 transition">
                        <Phone className="w-5 h-5" /> {member.phone}
                      </a>
                      <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-3 text-gray-700 hover:text-blue-600 transition">
                        <Mail className="w-5 h-5" /> {member.email}
                      </a>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center gap-4 mt-6">
                      <a href={`https://${member.github}`} target="_blank" className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition">
                        <Github className="w-5 h-5 text-blue-700" />
                      </a>
                      <a href="#" className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition">
                        <Linkedin className="w-5 h-5 text-blue-700" />
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