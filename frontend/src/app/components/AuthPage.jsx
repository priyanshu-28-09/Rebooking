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
    <div className="min-h-screen flex">
      {/* Left Side - Brand & Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gradient-primary text-white flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-light opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light opacity-10 rounded-full"></div>

        <div className="relative z-10 text-center">
          <div className="text-8xl mb-6">🚂</div>
          <h2 className="heading-2 text-white mb-4">TicketShare</h2>
          <p className="text-xl text-blue-100 mb-8">
            Smart Train Ticket Rebooking Platform
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>Save up to 60% on train tickets</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>100% secure and verified transactions</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>Buy or sell in just minutes</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <span>Join 45K+ happy travelers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition mb-8"
          >
            ← Back to Home
          </button>

          {/* Form Header */}
          <div className="mb-8 fade-in">
            <h1 className="heading-2 text-foreground mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-text-secondary">
              {isLogin 
                ? 'Sign in to your TicketShare account' 
                : 'Join TicketShare and start saving on tickets'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 fade-in">
            {/* Name Field (Register only) */}
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="form-input"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="form-input"
                required
              />
            </div>

            {/* Phone Field (Register only) */}
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="form-input"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Role Field (Register only) */}
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">I am a</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="buyer">👤 Buyer - Looking to buy tickets</option>
                  <option value="seller">📤 Seller - Want to sell tickets</option>
                </select>
              </div>
            )}

            {/* Password Field */}
            <div className="form-group">
              <div className="flex justify-between items-center mb-2">
                <label className="form-label">Password</label>
                {isLogin && (
                  <a href="#" className="text-primary text-sm font-semibold hover:underline">
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
                  className="form-input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-primary"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-large w-full mt-6"
            >
              {loading ? '⏳ Loading...' : (isLogin ? '🔓 Sign In' : '✨ Create Account')}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-text-secondary">or</span>
            </div>
          </div>

          {/* Social Login (Future) */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="btn btn-outline w-full">Google</button>
            <button className="btn btn-outline w-full">Apple</button>
          </div>

          {/* Toggle Login/Register */}
          <div className="text-center">
            <p className="text-text-secondary">
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
                className="text-primary font-bold hover:underline"
              >
                {isLogin ? 'Register Now' : 'Sign In'}
              </button>
            </p>
          </div>

          {/* Terms */}
          <p className="text-xs text-text-tertiary text-center mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
