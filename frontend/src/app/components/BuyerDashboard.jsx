import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';

export default function BuyerDashboard() {
  const { user, logout } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🚂 TicketShare</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Available Tickets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tickets.length === 0 ? (
              <p className="text-gray-600 col-span-full">No tickets available yet</p>
            ) : (
              tickets.map(ticket => (
                <div key={ticket.id} className="border rounded-lg p-4">
                  <p className="font-semibold">{ticket.trainName}</p>
                  <p className="text-gray-600">{ticket.source} → {ticket.destination}</p>
                  <p className="text-lg font-bold text-blue-600 mt-2">₹{ticket.price}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
