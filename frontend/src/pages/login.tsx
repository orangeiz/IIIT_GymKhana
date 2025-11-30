import Navbar from '../components/navbar';
import { useState } from 'react';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await authAPI.login(formData.email, formData.password);
      } else {
        await authAPI.register(formData.name, formData.email, formData.password, formData.rollNumber);
      }
      navigate('/');
      window.location.reload(); // Refresh to update navbar
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-6">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
              {isLogin ? 'Login' : 'Register'}
            </h1>

            {error && (
              <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-lg font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold mb-2">Roll Number</label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg"
                      value={formData.rollNumber}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-lg font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-yellow-500 text-lg"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-black font-bold text-xl py-5 rounded-xl hover:bg-yellow-400 transition disabled:opacity-50"
              >
                {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({ name: '', email: '', password: '', rollNumber: '' });
                }}
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
              </button>
            </div>

            {isLogin && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
                <p className="font-semibold mb-2">Demo Credentials:</p>
                <p>Email: admin@gymkhana.edu</p>
                <p>Password: admin123</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

