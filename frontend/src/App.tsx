// src/App.jsx
import './App.css';
import { Dumbbell, Code, Music } from 'lucide-react';
import Navbar from './components/navbar';
import { Routes, Route } from 'react-router-dom';
import SportsClub from './pages/clubs/sports';
import TechnicalClub from './pages/clubs/technical';
import CulturalClub from './pages/clubs/cultural';
import About from './pages/about';
import Booking from './pages/booking';
import AdminPanel from './pages/admin';
import stadiumImg from './assets/stadium.jpg';

function Home() {
  const clubLinks = [
    { name: "Sports Club", icon: Dumbbell, color: "from-red-500 to-orange-600", path: "/clubs/sports" },
    { name: "Technical Club", icon: Code, color: "from-blue-500 to-cyan-600", path: "/clubs/technical" },
    { name: "Cultural Club", icon: Music, color: "from-purple-500 to-pink-600", path: "/clubs/cultural" },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={stadiumImg} alt="College Stadium" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">Gymkhana Portal</h1>
          <p className="text-2xl md:text-4xl mb-8 text-yellow-300">Where Passion Meets Ground</p>
          <p className="text-xl md:text-2xl text-gray-200">Sports • Technical • Cultural • Events • Booking</p>
        </div>
      </section>

      {/* Clubs Section – This is where "Clubs" navbar link scrolls to */}
      <section id="clubs-section" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-gray-800">Explore Our Clubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {clubLinks.map((club) => (
              <a
                key={club.name}
                href={club.path}
                className="group relative rounded-3xl overflow-hidden shadow-2xl h-96 transform hover:scale-105 transition duration-500 block"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${club.color} opacity-85 group-hover:opacity-95 transition`}></div>
                <div className="relative h-full flex flex-col justify-end p-12 text-white">
                  <club.icon className="w-24 h-24 mb-6 drop-shadow-2xl" />
                  <h3 className="text-4xl md:text-5xl font-bold drop-shadow-lg">{club.name}</h3>
                  <p className="mt-6 text-xl opacity-90 font-medium">View Events →</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clubs" element={<Home />} /> {/* Same as home — for direct access */}

      {/* Club Pages */}
      <Route path="/clubs/sports" element={<SportsClub />} />
      <Route path="/clubs/technical" element={<TechnicalClub />} />
      <Route path="/clubs/cultural" element={<CulturalClub />} />

      <Route path="/about" element={<About />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;