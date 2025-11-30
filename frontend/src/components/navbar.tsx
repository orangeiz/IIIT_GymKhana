// src/components/navbar.tsx
import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authAPI.isAuthenticated();
      setIsLoggedIn(authenticated);
      if (authenticated) {
        setUser(authAPI.getUser());
      }
    };
    checkAuth();
    // Check auth state periodically
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    setIsLoggedIn(false);
    setUser(null);
    setProfileOpen(false);
    navigate('/');
  };

  const isAdmin = user?.isAdmin || false;
  const userName = user?.name || 'User';

  // Smart "Clubs" click handler
  const handleClubsClick = () => {
    if (location.pathname !== '/' && location.pathname !== '/clubs') {
      // If not on home → go to home first
      navigate('/');
      // Wait a tiny bit for page to load, then scroll
      setTimeout(() => {
        document.getElementById('clubs-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      // Already on home → just scroll
      document.getElementById('clubs-section')?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenu(false);
  };

  const isActive = (path:any) => location.pathname === path ? "text-yellow-400 font-bold" : "text-white hover:text-yellow-400";

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-lg z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-yellow-400 tracking-tight">Gymkhana</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-lg">
          <Link to="/" className={`${isActive("/")} transition`}>Home</Link>
          <Link to="/about" className={`${isActive("/about")} transition`}>About</Link>
          
          {/* MAGIC BUTTON — Works from ANY page */}
          <button
            onClick={handleClubsClick}
            className="text-white hover:text-yellow-400 transition font-medium"
          >
            Clubs
          </button>

          <Link to="/booking" className={`${isActive("/booking")} transition`}>Booking</Link>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 text-white hover:text-yellow-400 transition font-medium"
              >
                <User className="w-5 h-5" />
                {userName}
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl">
                  {isAdmin && (
                    <Link to="/admin" className="flex items-center gap-3 px-5 py-4 hover:bg-gray-800 text-white">
                      <Shield className="w-5 h-5" /> Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-5 py-4 hover:bg-gray-800 text-red-400 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-yellow-500 text-black px-7 py-3 rounded-full font-bold hover:bg-yellow-400">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-white">
          {mobileMenu ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-black/98 border-t border-gray-800">
          <Link to="/" className="block px-8 py-5 text-white hover:bg-gray-900">Home</Link>
          <Link to="/about" className="block px-8 py-5 text-white hover:bg-gray-900">About</Link>
          
          <button
            onClick={handleClubsClick}
            className="block w-full text-left px-8 py-5 text-white hover:bg-gray-900"
          >
            Clubs
          </button>
          
          <Link to="/booking" className="block px-8 py-5 text-white hover:bg-gray-900">Booking</Link>
          {isLoggedIn && isAdmin && (
            <Link to="/admin" className="block px-8 py-5 text-white hover:bg-gray-900">Admin Panel</Link>
          )}
        </div>
      )}
    </nav>
  );
}