import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export default function AuthPage({ onBack }) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'buyer',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = isLogin
        ? await login(formData.email, formData.password)
        : await register(formData);

      if (result.success) {
        toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Brand & Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-transparent opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-400 to-transparent opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-to-br from-cyan-400 to-transparent opacity-15 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-sm animate-slide-in-left">
          <div className="text-9xl mb-8 animate-float filter drop-shadow-2xl">🚂</div>
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 text-transparent bg-clip-text">TicketShare</h2>
          <p className="text-2xl text-blue-100 mb-12 font-light">
            Smart Train Ticket Rebooking
          </p>
          <div className="space-y-4 text-left bg-gradient-to-br from-white from-10% to-slate-100 bg-opacity-10 backdrop-blur-xl rounded-2xl p-8 border border-white border-opacity-20 shadow-2xl">
            <div className="flex items-center gap-3 group">
              <span className="text-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">✓</span>
              <span className="text-lg font-medium">Save up to 60% on train tickets</span>
            </div>
            <div className="flex items-center gap-3 group">
              <span className="text-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">✓</span>
              <span className="text-lg font-medium">100% secure transactions</span>
            </div>
            <div className="flex items-center gap-3 group">
              <span className="text-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">✓</span>
              <span className="text-lg font-medium">Complete in just minutes</span>
            </div>
            <div className="flex items-center gap-3 group">
              <span className="text-2xl bg-gradient-to-br from-green-400 to-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform">✓</span>
              <span className="text-lg font-medium">Join 45K+ happy travelers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="w-full max-w-md animate-fade-in">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-all font-bold mb-12 group transform hover:-translate-x-1"
          >
            <span className="text-xl group-hover:scale-125 transition-transform">←</span>
            Back to Home
          </button>

          {/* Form Header */}
          <div className="mb-10">
            <h1 className="text-5xl font-black text-slate-900 mb-3 bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text">
              {isLogin ? '👋 Welcome Back' : '🎉 Join Now'}
            </h1>
            <p className="text-xl text-slate-600 font-light">
              {isLogin 
                ? 'Sign in to explore amazing deals on train tickets' 
                : 'Create your account and start saving today'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mb-8">
            {/* Name Field (Register only) */}
            {!isLogin && (
              <div className="animate-slide-in-up">
                <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-2xl focus:shadow-blue-200 transition-all text-slate-900 placeholder-slate-400 font-medium hover:border-blue-400"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="animate-slide-in-up">
              <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-2xl focus:shadow-blue-200 transition-all text-slate-900 placeholder-slate-400 font-medium hover:border-blue-400"
                required
              />
            </div>

            {/* Phone Field (Register only) */}
            {!isLogin && (
              <div className="animate-slide-in-up">
                <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-2xl focus:shadow-blue-200 transition-all text-slate-900 placeholder-slate-400 font-medium hover:border-blue-400"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Role Field (Register only) */}
            {!isLogin && (
              <div className="animate-slide-in-up">
                <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">I am a</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-2xl focus:shadow-blue-200 transition-all text-slate-900 font-medium hover:border-blue-400"
                >
                  <option value="buyer">👤 Buyer - Looking to buy tickets</option>
                  <option value="seller">📤 Seller - Want to sell tickets</option>
                  <option value="admin">⚙️ Admin - Manage platform</option>
                </select>
              </div>
            )}

            {/* Password Field */}
            <div className="animate-slide-in-up">
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider">Password</label>
                {isLogin && (
                  <a href="#" className="text-blue-600 text-sm font-bold hover:text-blue-700 transition-colors">
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-5 py-4 pr-14 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 focus:shadow-2xl focus:shadow-blue-200 transition-all text-slate-900 placeholder-slate-400 font-medium hover:border-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-blue-600 transition-colors text-2xl hover:scale-125 active:scale-95"
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4 text-lg uppercase tracking-wider"
            >
              {loading ? '⏳ Loading...' : (isLogin ? '🔓 Sign In' : '✨ Create Account')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-slate-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-slate-600 font-bold text-sm uppercase tracking-wider">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button type="button" className="py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-full hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg">
              Google
            </button>
            <button type="button" className="py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-full hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg">
              Apple
            </button>
          </div>

          {/* Toggle Login/Register */}
          <div className="text-center">
            <p className="text-slate-700 font-medium">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              {' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    role: 'buyer',
                  });
                  setShowPassword(false);
                }}
                className="text-blue-600 font-bold hover:text-blue-700 transition-all transform hover:scale-105 active:scale-95"
              >
                {isLogin ? 'Register Now' : 'Sign In'}
              </button>
            </p>
            </p>
          </div>

          {/* Terms */}
          <p className="text-xs text-slate-500 text-center mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline font-semibold">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:underline font-semibold">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
