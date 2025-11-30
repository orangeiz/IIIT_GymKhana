import Navbar from '../components/navbar';
import { Calendar, MapPin, Users, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventsAPI, authAPI } from '../services/api';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: ''
  });

  useEffect(() => {
    fetchEventDetails();
    const user = authAPI.getUser();
    if (user) {
      setFormData({
        name: user.name || '',
        rollNumber: user.rollNumber || ''
      });
    }
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const eventData = await eventsAPI.getById(Number(id));
      setEvent(eventData);
    } catch (error: any) {
      setError(error.message || 'Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistering(true);
    setError('');
    setRegistrationSuccess(false);

    try {
      if (!formData.name || !formData.rollNumber) {
        setError('Name and roll number are required');
        return;
      }

      await eventsAPI.register(Number(id), formData.name, formData.rollNumber);
      setRegistrationSuccess(true);
      // Refresh event data to update registration count
      await fetchEventDetails();
      setFormData({ name: '', rollNumber: '' });
    } catch (error: any) {
      setError(error.message || 'Failed to register for event');
    } finally {
      setRegistering(false);
    }
  };

  const getClubColor = (club: string) => {
    switch (club) {
      case 'sports':
        return 'from-red-500 to-orange-600';
      case 'technical':
        return 'from-blue-500 to-cyan-600';
      case 'cultural':
        return 'from-purple-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getClubButtonColor = (club: string) => {
    switch (club) {
      case 'sports':
        return 'bg-red-600 hover:bg-red-700';
      case 'technical':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'cultural':
        return 'bg-purple-600 hover:bg-purple-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading event details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error && !event) {
    return (
      <>
        <Navbar />
        <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-600">Event not found</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-4 bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className={`relative py-20 bg-linear-to-br ${getClubColor(event.club)} text-white`}>
          <div className="max-w-7xl mx-auto px-6">
            <Link
              to={`/clubs/${event.club}`}
              className="inline-flex items-center gap-2 mb-6 text-white/80 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back to {event.club.charAt(0).toUpperCase() + event.club.slice(1)} Club
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                <span>{event.registered || 0} Registered</span>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details and Registration */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
            {/* Event Details */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Event Details</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-600">
                    {event.description || 'Join us for this exciting event! More details will be shared soon.'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="font-semibold text-gray-800">{event.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Venue</p>
                    <p className="font-semibold text-gray-800">{event.venue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Registrations</p>
                    <p className="font-semibold text-gray-800">{event.registered || 0} participants</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Club</p>
                    <p className="font-semibold text-gray-800 capitalize">{event.club}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              {registrationSuccess ? (
                <div className="text-center py-8">
                  <div className="p-6 bg-green-100 border-2 border-green-400 text-green-700 rounded-xl flex flex-col items-center gap-4">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                    <div>
                      <p className="font-bold text-xl mb-2">Registration Successful!</p>
                      <p className="text-base">You have been registered for this event.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">Register for Event</h2>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold mb-2 text-gray-700">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={registering}
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-semibold mb-2 text-gray-700">Roll Number</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg"
                        placeholder="21CS123"
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        required
                        disabled={registering}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={registering}
                      className={`w-full ${getClubButtonColor(event.club)} text-white font-bold text-xl py-5 rounded-xl hover:shadow-2xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                    >
                      {registering ? 'Registering...' : 'Register Now'}
                    </button>

                    {!authAPI.isAuthenticated() && (
                      <p className="text-sm text-gray-600 text-center">
                        <Link to="/login" className="text-yellow-600 hover:underline font-medium">
                          Login
                        </Link> to auto-fill your details
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

