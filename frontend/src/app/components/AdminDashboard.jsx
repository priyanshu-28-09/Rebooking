import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';
import Navbar from './Navbar';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [pendingTickets, setPendingTickets] = useState([
    { id: 1, train: 'Rajdhani Express', number: '12306', seller: 'John Doe', source: 'Delhi', destination: 'Mumbai', price: 2500, status: 'pending', date: 'Jan 14, 2024' },
    { id: 2, train: 'Shatabdi Express', number: '12001', seller: 'Jane Smith', source: 'Mumbai', destination: 'Bangalore', price: 1800, status: 'pending', date: 'Jan 15, 2024' },
  ]);
  const [transactions, setTransactions] = useState([
    { id: 1, buyer: 'Alice', seller: 'Bob', train: 'Garib Rath', amount: 1200, status: 'completed', date: 'Jan 10, 2024', time: '2:30 PM' },
    { id: 2, buyer: 'Charlie', seller: 'Diana', train: 'AC Express', amount: 3500, status: 'completed', date: 'Jan 12, 2024', time: '5:15 PM' },
    { id: 3, buyer: 'Eve', seller: 'Frank', train: 'Super Fast', amount: 850, status: 'completed', date: 'Jan 13, 2024', time: '11:45 AM' },
  ]);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleVerifyTicket = async (ticketId, approve) => {
    if (approve) {
      setPendingTickets(pendingTickets.filter(t => t.id !== ticketId));
      toast.success('Ticket verified and approved!');
    } else {
      setPendingTickets(pendingTickets.filter(t => t.id !== ticketId));
      toast.error('Ticket rejected.');
    }
  };

  const stats = [
    { label: 'Total Users', value: '45,230', icon: '👥', color: 'from-blue-500 to-blue-600' },
    { label: 'Pending Tickets', value: pendingTickets.length, icon: '⏳', color: 'from-yellow-500 to-yellow-600' },
    { label: 'Total Revenue', value: `₹${transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}`, icon: '💰', color: 'from-green-500 to-green-600' },
    { label: 'Completed Transactions', value: transactions.length, icon: '✓', color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-16 animate-fade-in">
          <h1 className="text-6xl font-black text-slate-900 mb-3">Admin Dashboard</h1>
          <p className="text-2xl text-slate-600 font-light">Manage platform tickets, transactions, and users</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

        {/* Tabs */}
        <div className="flex gap-6 mb-10 border-b-2 border-slate-200 overflow-x-auto pb-4">
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
            { id: 'pending', label: '⏳ Pending Verification', icon: '⏳' },
            { id: 'transactions', label: '💳 Transactions', icon: '💳' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 font-bold text-lg transition-all whitespace-nowrap relative group ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
              <span className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-700 transition-all duration-300 ${activeTab === tab.id ? 'w-full' : 'w-0 group-hover:w-1/2'}`}></span>
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fade-in">
            {/* Quick Stats */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Platform Overview</h2>
              <div className="space-y-5">
                <div className="flex justify-between items-center pb-5 border-b-2 border-slate-200 group hover:translate-x-2 transition-transform">
                  <span className="text-lg text-slate-700 font-bold">Active Listings</span>
                  <span className="text-3xl font-black text-blue-600">2,450+</span>
                </div>
                <div className="flex justify-between items-center pb-5 border-b-2 border-slate-200 group hover:translate-x-2 transition-transform">
                  <span className="text-lg text-slate-700 font-bold">Successful Rebookings</span>
                  <span className="text-3xl font-black text-green-600">15.8K+</span>
                </div>
                <div className="flex justify-between items-center pb-5 border-b-2 border-slate-200 group hover:translate-x-2 transition-transform">
                  <span className="text-lg text-slate-700 font-bold">Total Amount Saved</span>
                  <span className="text-3xl font-black text-purple-600">₹2.5Cr+</span>
                </div>
                <div className="flex justify-between items-center group hover:translate-x-2 transition-transform">
                  <span className="text-lg text-slate-700 font-bold">Pending Verifications</span>
                  <span className="text-3xl font-black text-orange-600">{pendingTickets.length}</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-3xl font-black text-slate-900 mb-8">Recent Activity</h2>
              <div className="space-y-5">
                {[
                  { action: 'New user registered', time: '5 minutes ago', icon: '👤', color: 'bg-blue-100' },
                  { action: 'Ticket verified successfully', time: '12 minutes ago', icon: '✓', color: 'bg-green-100' },
                  { action: 'Payment processed', time: '1 hour ago', icon: '💳', color: 'bg-purple-100' },
                  { action: 'New ticket uploaded', time: '2 hours ago', icon: '📤', color: 'bg-orange-100' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 pb-5 border-b-2 border-slate-200 last:border-b-0 last:pb-0 group hover:translate-x-2 transition-transform">
                    <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>{item.icon}</div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900 text-lg">{item.action}</p>
                      <p className="text-sm text-slate-600 font-medium">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pending Tickets Tab */}
        {activeTab === 'pending' && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in">
            <div className="bg-gradient-to-r from-yellow-600 via-yellow-700 to-orange-600 px-10 py-8">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                ⏳ Pending Ticket Verification
              </h2>
              <p className="text-yellow-100 mt-2 font-bold text-lg">{pendingTickets.length} tickets awaiting verification</p>
            </div>

            <div className="p-10">
              {pendingTickets.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6 animate-float">✓</div>
                  <p className="text-slate-700 text-2xl font-bold">All caught up!</p>
                  <p className="text-slate-600 mt-2 text-lg font-light">No pending tickets to verify</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {pendingTickets.map(ticket => (
                    <div 
                      key={ticket.id} 
                      className="group relative border-2 border-slate-200 rounded-2xl p-8 hover:border-yellow-400 hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                    >
                      {/* Hover Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-5">
                          <div>
                            <h3 className="text-2xl font-black text-slate-900">{ticket.train}</h3>
                            <p className="text-base text-slate-600 font-medium">Train #{ticket.number}</p>
                          </div>
                          <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-sm font-bold shadow-lg">
                            Pending
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y-2 border-slate-200 mb-6">
                          <div className="text-center">
                            <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Seller</p>
                            <p className="font-black text-slate-900 mt-2">{ticket.seller}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Route</p>
                            <p className="font-black text-slate-900 mt-2">{ticket.source} → {ticket.destination}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Price</p>
                            <p className="font-black text-slate-900 mt-2">₹{ticket.price}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">Submitted</p>
                            <p className="font-black text-slate-900 mt-2">{ticket.date}</p>
                          </div>
                        </div>

                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => handleVerifyTicket(ticket.id, false)}
                            className="px-7 py-3 border-2 border-red-600 text-red-600 font-bold rounded-full hover:bg-red-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleVerifyTicket(ticket.id, true)}
                            className="px-7 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-green-400 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg"
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in">
            <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 px-10 py-8">
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                💳 Transaction History
              </h2>
              <p className="text-purple-100 mt-2 font-bold text-lg">{transactions.length} total transactions</p>
            </div>

            <div className="p-10 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-5 px-6 font-black text-slate-900 uppercase tracking-wider text-sm">Buyer</th>
                    <th className="text-left py-5 px-6 font-black text-slate-900 uppercase tracking-wider text-sm">Seller</th>
                    <th className="text-left py-5 px-6 font-black text-slate-900 uppercase tracking-wider text-sm">Train</th>
                    <th className="text-left py-5 px-6 font-black text-slate-900 uppercase tracking-wider text-sm">Amount</th>
                    <th className="text-left py-5 px-6 font-black text-slate-900 uppercase tracking-wider text-sm">Date & Time</th>
                    <th className="text-left py-5 px-6 font-black text-slate-900 uppercase tracking-wider text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, idx) => (
                    <tr 
                      key={tx.id} 
                      className="border-b border-slate-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-y-105 group"
                    >
                      <td className="py-5 px-6 font-bold text-slate-900 text-base group-hover:text-blue-600">{tx.buyer}</td>
                      <td className="py-5 px-6 font-bold text-slate-900 text-base group-hover:text-blue-600">{tx.seller}</td>
                      <td className="py-5 px-6 text-slate-700 text-base font-semibold">{tx.train}</td>
                      <td className="py-5 px-6 font-black text-green-600 text-lg">₹{tx.amount}</td>
                      <td className="py-5 px-6 text-sm text-slate-600 font-medium">{tx.date}<br/><span className="font-bold">{tx.time}</span></td>
                      <td className="py-5 px-6">
                        <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-sm font-black shadow-lg">
                          {tx.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
