import Navbar from '../components/navbar';
import collegeLogo from '../assets/iiit.png';

export default function About() {
  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-linear-to-b from-gray-50 to-white">
        {/* Hero */}
        <section className="relative py-20 text-center">
          <div className="max-w-5xl mx-auto px-6">
            <img src={collegeLogo} alt="College Logo" className="w-40 h-40 mx-auto mb-8 rounded-full shadow-2xl" />
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6">About Gymkhana</h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              The heart of student life at our college — where talent meets opportunity.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
            <div className="text-center p-10 bg-linear-to-br from-yellow-50 to-orange-50 rounded-3xl shadow-xl">
              <h2 className="text-4xl font-bold text-orange-600 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                To promote holistic development through sports, technical innovation, and cultural expression. 
                We believe every student deserves a platform to shine.
              </p>
            </div>
            <div className="text-center p-10 bg-lienear-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-xl">
              <h2 className="text-4xl font-bold text-blue-600 mb-6">Our Vision</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                To be the most vibrant and inclusive student body in the region, 
                fostering leadership, teamwork, and creativity beyond classrooms.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <h3 className="text-5xl font-bold text-yellow-400">50+</h3>
              <p className="text-xl mt-2">Annual Events</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-yellow-400">3000+</h3>
              <p className="text-xl mt-2">Active Members</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-yellow-400">15</h3>
              <p className="text-xl mt-2">Sports Teams</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-yellow-400">100+</h3>
              <p className="text-xl mt-2">Awards Won</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}