import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';
import Navbar from './Navbar';

export default function SellerDashboard() {
  const { user, logout } = useAuth();
  const [myTickets, setMyTickets] = useState([
    { id: 1, train: 'Rajdhani Express', number: '12306', source: 'Delhi', destination: 'Mumbai', date: 'Jan 15', price: 2500, originalPrice: 4200, seats: 2, status: 'active', views: 245, bookings: 3 },
    { id: 2, train: 'Shatabdi Express', number: '12001', source: 'Mumbai', destination: 'Bangalore', date: 'Jan 18', price: 1800, originalPrice: 3200, seats: 1, status: 'sold', views: 189, bookings: 1 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    pnrNumber: '',
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    journeyDate: '',
    departureTime: '',
    arrivalTime: '',
    seatNumber: '',
    class: 'Sleeper',
    price: '',
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
    const newTicket = {
      id: Math.random(),
      train: formData.trainName,
      number: formData.trainNumber,
      source: formData.source,
      destination: formData.destination,
      date: formData.journeyDate,
      price: parseInt(formData.price),
      originalPrice: parseInt(formData.price) * 1.5,
      seats: 2,
      status: 'pending',
      views: 0,
      bookings: 0,
    };
    setMyTickets([...myTickets, newTicket]);
    toast.success('Ticket uploaded successfully! Awaiting verification.');
    setShowForm(false);
    setFormData({
      pnrNumber: '',
      trainNumber: '',
      trainName: '',
      source: '',
      destination: '',
      journeyDate: '',
      departureTime: '',
      arrivalTime: '',
      seatNumber: '',
      class: 'Sleeper',
      price: '',
    });
  };

  const stats = [
    { label: 'Total Listings', value: myTickets.length, icon: '🎫', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Earnings', value: `₹${myTickets.reduce((sum, t) => sum + (t.price * (t.bookings || 0)), 0).toLocaleString()}`, icon: '💰', color: 'from-green-500 to-green-600' },
    { label: 'Active Listings', value: myTickets.filter(t => t.status === 'active').length, icon: '✓', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-6xl font-black text-slate-900 mb-3">
            Welcome back, <span className="bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 text-transparent bg-clip-text">{user?.name}!</span>
          </h1>
          <p className="text-2xl text-slate-600 font-light">Manage your ticket listings and track earnings</p>
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

        {/* Upload Ticket Section */}
        {showForm && (
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-10 animate-slide-in-up transform">
            <div className="bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 px-10 py-8">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                📝 Upload New Ticket
              </h2>
              <p className="text-orange-100 mt-2 font-light text-lg">Fill in the details to list your ticket</p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="pnrNumber"
                  placeholder="PNR Number"
                  value={formData.pnrNumber}
                  onChange={handleChange}
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-600 focus:shadow-2xl focus:shadow-orange-200 transition-all text-slate-900 placeholder-slate-400 font-medium hover:border-orange-400"
                  required
                />
                <input
                  type="text"
                  name="trainNumber"
                  placeholder="Train Number"
                  value={formData.trainNumber}
                  onChange={handleChange}
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-600 focus:shadow-2xl focus:shadow-orange-200 transition-all text-slate-900 placeholder-slate-400 font-medium hover:border-orange-400"
                  required
                />
                <input
                  type="text"
                  name="trainName"
                  placeholder="Train Name"
                  value={formData.trainName}
                  onChange={handleChange}
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-600 focus:shadow-2xl focus:shadow-orange-200 transition-all text-slate-900 placeholder-slate-400 font-medium hover:border-orange-400"
                  required
                />
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-600 focus:shadow-2xl focus:shadow-orange-200 transition-all text-slate-900 font-medium hover:border-orange-400"
                >
                  <option value="Sleeper">Sleeper Class</option>
                  <option value="AC-3">AC-3 Tier</option>
                  <option value="AC-2">AC-2 Tier</option>
                  <option value="FirstClass">First Class</option>
                </select>
                <input
                  type="text"
                  name="source"
                  placeholder="Source City"
                  value={formData.source}
                  onChange={handleChange}
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-600 focus:shadow-2xl focus:shadow-orange-200 transition-all text-slate-900 placeholder-slate-400 font-medium hover:border-orange-400"
                  required
                />
                <input
                  type="text"
                  name="destination"
                  placeholder="Destination City"
                  value={formData.destination}
                  onChange={handleChange}
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-600 focus:shadow-2xl focus:shadow-orange-200 transition-all text-slate-900 placeholder-slate-400 font-medium hover:border-orange-400"
                  required
                />
                <input
                  type="date"
                  name="journeyDate"
                  value={formData.journeyDate}
                  onChange={handleChange}
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-600 focus:shadow-2xl focus:shadow-orange-200 transition-all text-slate-900 font-medium hover:border-orange-400"
                  required
                />
                <input
                  type="text"
                  name="seatNumber"
                  placeholder="Seat Number"
                  value={formData.seatNumber}
                  onChange={handleChange}
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-600 focus:shadow-2xl focus:shadow-orange-200 transition-all text-slate-900 placeholder-slate-400 font-medium hover:border-orange-400"
                  required
                />
                <input
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-600 focus:shadow-2xl focus:shadow-orange-200 transition-all text-slate-900 font-medium hover:border-orange-400"
                />
                <input
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-600 focus:shadow-2xl focus:shadow-orange-200 transition-all text-slate-900 font-medium hover:border-orange-400"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Your Price (₹)"
                  value={formData.price}
                  onChange={handleChange}
                  className="px-6 py-4 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-orange-600 focus:shadow-2xl focus:shadow-orange-200 transition-all text-slate-900 placeholder-slate-400 font-medium hover:border-orange-400"
                  required
                />
              </div>

              <div className="flex gap-4 justify-end pt-6 border-t-2 border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-4 border-2 border-slate-400 text-slate-700 font-bold rounded-full hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-10 py-4 bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-orange-400 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg uppercase tracking-wider"
                >
                  Upload Ticket
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Upload Button */}
        {!showForm && (
          <div className="mb-10">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-10 py-5 bg-gradient-to-r from-orange-600 via-orange-700 to-red-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-orange-400 transition-all duration-300 transform hover:scale-105 active:scale-95 text-xl uppercase tracking-wider"
            >
              + Upload New Ticket
            </button>
          </div>
        )}

        {/* My Tickets Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 px-10 py-8">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
              📋 My Ticket Listings
            </h2>
            <p className="text-blue-100 mt-2 font-bold text-lg">{myTickets.length} tickets listed</p>
          </div>

          <div className="p-8">
            {myTickets.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-8xl mb-6 animate-float">📭</div>
                <p className="text-slate-700 text-2xl font-bold">No tickets uploaded yet</p>
                <p className="text-slate-600 mt-2 text-lg font-light">Upload your first ticket to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {myTickets.map(ticket => (
                  <div 
                    key={ticket.id} 
                    className="group relative border-2 border-slate-200 rounded-2xl p-8 hover:border-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Hover Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-5">
                        <div>
                          <h3 className="text-2xl font-black text-slate-900">{ticket.train}</h3>
                          <p className="text-base text-slate-600 font-medium">Train #{ticket.number}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                          ticket.status === 'active' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                          ticket.status === 'sold' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                          'bg-gradient-to-r from-yellow-500 to-yellow-600'
                        }`}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-4 text-lg font-semibold text-slate-700">
                        <span>{ticket.source}</span>
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">→</span>
                        <span>{ticket.destination}</span>
                        <span className="text-base ml-auto text-slate-600">{ticket.date}</span>
                      </div>

                      <div className="grid grid-cols-4 gap-4 py-6 border-y-2 border-slate-200 mb-6">
                        <div className="text-center">
                          <p className="text-sm text-slate-600 font-bold uppercase tracking-wider">Price</p>
                          <p className="text-2xl font-black text-slate-900 mt-2">₹{ticket.price}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-slate-600 font-bold uppercase tracking-wider">Seats</p>
                          <p className="text-2xl font-black text-slate-900 mt-2">{ticket.seats}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-slate-600 font-bold uppercase tracking-wider">Views</p>
                          <p className="text-2xl font-black text-slate-900 mt-2">{ticket.views}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-slate-600 font-bold uppercase tracking-wider">Bookings</p>
                          <p className="text-2xl font-black text-slate-900 mt-2">{ticket.bookings}</p>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-end">
                        <button className="px-6 py-3 border-2 border-slate-400 text-slate-700 font-bold rounded-full hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 active:scale-95">
                          Edit
                        </button>
                        <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
