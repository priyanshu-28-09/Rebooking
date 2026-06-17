import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';
import Navbar from './Navbar';

export default function BuyerDashboard() {
  const { user, logout } = useAuth();
  const [tickets, setTickets] = useState([
    { id: 1, train: 'Rajdhani Express', number: '12306', source: 'Delhi', destination: 'Mumbai', date: 'Jan 15', price: 2500, originalPrice: 4200, seats: 2, status: 'available' },
    { id: 2, train: 'Shatabdi Express', number: '12001', source: 'Mumbai', destination: 'Bangalore', date: 'Jan 18', price: 1800, originalPrice: 3200, seats: 1, status: 'available' },
  ]);
  const [bookings, setBookings] = useState([
    { id: 1, train: 'Garib Rath', source: 'Kolkata', destination: 'Hyderabad', date: 'Feb 10', price: 1200, status: 'confirmed' },
  ]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const handleBookTicket = (ticket) => {
    setBookings([...bookings, { ...ticket, id: ticket.id + Math.random(), status: 'confirmed' }]);
    toast.success(`Successfully booked ${ticket.train}!`);
  };

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: '🎫', color: 'from-blue-500 to-blue-600' },
    { label: 'Money Saved', value: `₹${bookings.reduce((sum, b) => sum + (Math.random() * 2000), 0).toFixed(0)}`, icon: '💰', color: 'from-green-500 to-green-600' },
    { label: 'Available Tickets', value: tickets.filter(t => t.status === 'available').length, icon: '✓', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-6xl font-black text-slate-900 mb-3">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-transparent bg-clip-text">{user?.name}!</span>
          </h1>
          <p className="text-2xl text-slate-600 font-light">Manage your bookings and explore amazing deals</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className={`group relative bg-gradient-to-br ${stat.color} rounded-2xl p-8 text-white shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform overflow-hidden`}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition-opacity rounded-2xl"></div>
              
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className="text-white text-opacity-80 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
                  <h3 className="text-5xl font-black mt-3">{stat.value}</h3>
                </div>
                <div className="text-5xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Available Tickets Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-10 py-8">
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  🎫 Available Tickets
                </h2>
                <p className="text-blue-100 mt-2 font-light text-lg">Hot deals happening now</p>
              </div>
              
              <div className="p-8">
                {tickets.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-8xl mb-6 animate-float">🚂</div>
                    <p className="text-slate-600 text-2xl font-bold">No tickets available right now</p>
                    <p className="text-slate-500 mt-2 text-lg font-light">Check back soon for amazing deals!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {tickets.map(ticket => (
                      <div 
                        key={ticket.id} 
                        className="group relative border-2 border-slate-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                      >
                        {/* Hover Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                        
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-5">
                            <div>
                              <h3 className="text-2xl font-black text-slate-900">{ticket.train}</h3>
                              <p className="text-base text-slate-600 font-medium">Train #{ticket.number}</p>
                            </div>
                            <div className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-sm font-bold shadow-lg">
                              {Math.round((1 - ticket.price / ticket.originalPrice) * 100)}% OFF
                            </div>
                          </div>

                          <div className="flex items-center gap-3 mb-4 text-lg font-semibold text-slate-700">
                            <span>{ticket.source}</span>
                            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl">→</span>
                            <span>{ticket.destination}</span>
                            <span className="text-base ml-auto text-slate-600">{ticket.date}</span>
                          </div>

                          <div className="flex justify-between items-center mb-6 pb-6 border-b-2 border-slate-200">
                            <span className="text-base text-slate-700 font-medium">{ticket.seats} seats available</span>
                            <div>
                              <span className="text-4xl font-black text-slate-900">₹{ticket.price}</span>
                              <span className="text-base text-slate-500 line-through ml-3 font-semibold">₹{ticket.originalPrice}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleBookTicket(ticket)}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg uppercase tracking-wider"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* My Bookings Sidebar */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden h-fit hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 px-10 py-8">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                📅 My Bookings
              </h2>
              <p className="text-orange-100 mt-2 font-bold text-lg">{bookings.length} total</p>
            </div>

            <div className="p-8 max-h-96 overflow-y-auto">
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 animate-float">📭</div>
                  <p className="text-slate-700 font-bold text-lg">No bookings yet</p>
                  <p className="text-slate-500 text-base mt-2">Book your first ticket!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map(booking => (
                    <div 
                      key={booking.id} 
                      className="group p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-l-4 border-blue-600 hover:shadow-lg hover:border-purple-600 transition-all duration-300 transform hover:-translate-x-1 cursor-pointer"
                    >
                      <p className="font-bold text-slate-900 text-base">{booking.train}</p>
                      <p className="text-sm text-slate-700 mt-2 font-medium">{booking.source} → {booking.destination}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full font-bold uppercase tracking-wider">{booking.status}</span>
                        <span className="font-black text-slate-900 text-lg">₹{booking.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 px-10 py-8">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              📊 Recent Activity
            </h2>
          </div>
          <div className="p-8">
            <div className="space-y-5">
              {[
                { action: 'Booked Rajdhani Express', time: '2 hours ago', icon: '✓', color: 'bg-green-100' },
                { action: 'Saved ₹1,700 on a ticket', time: '5 hours ago', icon: '💰', color: 'bg-yellow-100' },
                { action: 'Added funds to wallet', time: '1 day ago', icon: '💳', color: 'bg-blue-100' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 pb-5 border-b border-slate-200 last:border-b-0 last:pb-0 group hover:translate-x-2 transition-transform duration-300">
                  <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>{item.icon}</div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-lg">{item.action}</p>
                    <p className="text-sm text-slate-600 font-medium">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
