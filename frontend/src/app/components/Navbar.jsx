import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <nav className="navbar glass sticky top-0 z-50">
      <div className="container">
        <div className="flex-between py-4">
          {/* Logo */}
          <div className="flex-center gap-2">
            <div className="text-2xl font-bold gradient-primary px-3 py-1 rounded-lg text-white">
              🚆
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-primary">TicketShare</div>
              <div className="text-xs text-text-secondary">Smart Rebooking</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#" className="nav-link">Home</a>
            <a href="#browse" className="nav-link">Browse Tickets</a>
            <a href="#how" className="nav-link">How It Works</a>
            {user && <a href="#dashboard" className="nav-link">Dashboard</a>}
            {user && <a href="#" className="nav-link">My Bookings</a>}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <button className="btn btn-outline btn-small hidden sm:inline-flex">
                  Login
                </button>
                <button className="btn btn-primary btn-small">
                  Register
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-card transition"
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-text-primary">
                    {user.name}
                  </span>
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-semibold text-text-primary">{user.name}</p>
                      <p className="text-xs text-text-secondary">{user.email}</p>
                    </div>
                    <a href="#profile" className="block px-4 py-2 text-sm text-text-primary hover:bg-primary-light hover:text-primary transition">
                      Profile
                    </a>
                    {user.role === 'seller' && (
                      <a href="#sell" className="block px-4 py-2 text-sm text-text-primary hover:bg-primary-light hover:text-primary transition">
                        Sell Ticket
                      </a>
                    )}
                    {user.role === 'admin' && (
                      <a href="#admin" className="block px-4 py-2 text-sm text-text-primary hover:bg-primary-light hover:text-primary transition">
                        Admin Panel
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-card transition"
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-border">
            <a href="#" className="block py-2 px-4 text-text-secondary hover:text-primary transition">Home</a>
            <a href="#browse" className="block py-2 px-4 text-text-secondary hover:text-primary transition">Browse Tickets</a>
            <a href="#how" className="block py-2 px-4 text-text-secondary hover:text-primary transition">How It Works</a>
            {user && <a href="#dashboard" className="block py-2 px-4 text-text-secondary hover:text-primary transition">Dashboard</a>}
          </div>
        )}
      </div>
    </nav>
  );
}

const navStyles = `
  .navbar {
    border-bottom: 1px solid var(--border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .nav-link {
    color: var(--text-primary);
    font-weight: 500;
    position: relative;
    transition: var(--transition-fast);
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--primary);
    transition: width 0.3s ease;
  }

  .nav-link:hover::after {
    width: 100%;
  }
`;
