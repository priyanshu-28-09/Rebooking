import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export default function Navbar({ onGetStarted }) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white backdrop-blur-md bg-opacity-95 border-b border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer transform hover:scale-105 transition-transform duration-300">
            <div className="text-4xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">🚂</div>
            <div className="hidden sm:block">
              <div className="text-2xl font-black bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-transparent bg-clip-text">TicketShare</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Smart Rebooking</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <a href="#" className="text-slate-700 font-semibold hover:text-blue-600 transition-colors relative group py-2">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>
            <a href="#how" className="text-slate-700 font-semibold hover:text-blue-600 transition-colors relative group py-2">
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>
            <a href="#" className="text-slate-700 font-semibold hover:text-blue-600 transition-colors relative group py-2">
              Browse Tickets
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </a>
            {user && (
              <>
                <a href="#" className="text-slate-700 font-semibold hover:text-blue-600 transition-colors relative group py-2">
                  My Bookings
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </a>
                <a href="#" className="text-slate-700 font-semibold hover:text-blue-600 transition-colors relative group py-2">
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </a>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <button 
                  onClick={onGetStarted}
                  className="hidden sm:inline-flex px-7 py-2.5 text-slate-700 font-bold border-2 border-blue-600 rounded-full hover:bg-blue-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase text-sm tracking-wide"
                >
                  Login
                </button>
                <button 
                  onClick={onGetStarted}
                  className="px-7 py-2.5 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 uppercase text-sm tracking-wide"
                >
                  Get Started
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-slate-100 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-white text-sm font-black shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {user.name}
                  </span>
                  <span className="text-slate-500">▼</span>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-3 w-64 bg-white border-2 border-slate-200 rounded-2xl shadow-2xl py-2 z-50 animate-slide-in-down">
                    <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50">
                      <p className="text-base font-bold text-slate-900">{user.name}</p>
                      <p className="text-sm text-slate-600 font-medium">{user.email}</p>
                      <p className="text-xs text-blue-600 font-bold mt-2 uppercase tracking-wider bg-blue-100 px-2 py-1 rounded-full inline-block">{user.role}</p>
                    </div>
                    <a href="#profile" className="block px-6 py-3 text-base text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-semibold transition-all duration-200">
                      👤 Profile
                    </a>
                    {user.role === 'seller' && (
                      <a href="#sell" className="block px-6 py-3 text-base text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-semibold transition-all duration-200">
                        📤 Sell Ticket
                      </a>
                    )}
                    {user.role === 'admin' && (
                      <a href="#admin" className="block px-6 py-3 text-base text-slate-700 hover:bg-purple-50 hover:text-purple-600 font-semibold transition-all duration-200">
                        ⚙️ Admin Panel
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-6 py-3 text-base text-red-600 hover:bg-red-50 font-bold transition-all duration-200 border-t border-slate-200 mt-2 pt-3"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all duration-300 hover:shadow-lg"
            >
              <span className="text-3xl font-bold">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-slate-200 space-y-2 animate-slide-in-down">
            <a href="#" className="block py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl font-semibold transition-all duration-300 transform hover:translate-x-1">Home</a>
            <a href="#how" className="block py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl font-semibold transition-all duration-300 transform hover:translate-x-1">How It Works</a>
            <a href="#" className="block py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl font-semibold transition-all duration-300 transform hover:translate-x-1">Browse Tickets</a>
            {user && (
              <>
                <a href="#" className="block py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl font-semibold transition-all duration-300 transform hover:translate-x-1">My Bookings</a>
                <a href="#" className="block py-3 px-4 text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl font-semibold transition-all duration-300 transform hover:translate-x-1">Dashboard</a>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
