import { useState } from 'react';
import Navbar from './Navbar';

export default function LandingPage({ onGetStarted }) {
  const [email, setEmail] = useState('');

  const stats = [
    { label: 'Active Listings', value: '2,450+', icon: '🎫' },
    { label: 'Successful Rebookings', value: '15.8K+', icon: '✓' },
    { label: 'Registered Users', value: '45K+', icon: '👥' },
    { label: 'Amount Saved', value: '₹2.5Cr+', icon: '💰' },
  ];

  const steps = [
    {
      step: 1,
      title: 'Upload Your Ticket',
      description: 'Add your unused train ticket with journey details in just 2 minutes',
      icon: '📝',
    },
    {
      step: 2,
      title: 'Verification',
      description: 'Our team verifies your ticket authenticity within 24 hours',
      icon: '✓',
    },
    {
      step: 3,
      title: 'Buyer Connects',
      description: 'Interested buyers browse and book your ticket instantly',
      icon: '🔗',
    },
    {
      step: 4,
      title: 'Complete Rebooking',
      description: 'Receive payment securely via your preferred method',
      icon: '💳',
    },
  ];

  const benefits = [
    {
      title: 'Save Money',
      description: 'Get 40-60% discount on train tickets instead of losing them',
      icon: '💰',
    },
    {
      title: 'Zero Waste',
      description: 'Give unused tickets a second life instead of cancelling',
      icon: '♻️',
    },
    {
      title: 'Secure & Safe',
      description: '100% secure transactions with verification and buyer protection',
      icon: '🔒',
    },
    {
      title: 'Fast & Easy',
      description: 'Complete rebooking in minutes, not hours or days',
      icon: '⚡',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Frequent Traveler',
      text: 'Saved ₹3,200 on a Mumbai-Delhi ticket I couldn\'t use. Amazing platform!',
      avatar: '👩',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Regular Commuter',
      text: 'Got a ticket at 50% discount. Best thing that happened to my travel budget.',
      avatar: '👨',
    },
    {
      name: 'Anjali Patel',
      role: 'Business Traveler',
      text: 'Quick, secure, and hassle-free. Recommend to all my colleagues.',
      avatar: '👩‍💼',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar onGetStarted={onGetStarted} />

      {/* Hero Section */}
      <section className="pt-32 pb-40 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        {/* Premium Background Animation */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-300 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-orange-300 to-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-300 to-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="animate-fade-in">
              <div className="inline-block mb-8">
                <span className="px-6 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-full text-sm font-bold border border-blue-200 inline-flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  Smart Rebooking Companion
                </span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                Smart Train Ticket <br/>
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-transparent bg-clip-text drop-shadow-sm">Rebooking</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Platform</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed max-w-lg font-light">
                Buy, sell, and rebook unused train tickets securely. Save up to 60% on tickets while helping others travel affordably.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 mb-16">
                <button onClick={onGetStarted} className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg">
                  <span className="group-hover:scale-110 transition-transform">🎫</span>
                  Find Tickets Now
                </button>
                <button onClick={onGetStarted} className="group px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg">
                  <span className="group-hover:scale-110 transition-transform">📤</span>
                  Sell Your Ticket
                </button>
              </div>

              {/* Newsletter Signup */}
              <div className="flex gap-2 bg-white p-2 rounded-full border-2 border-slate-200 w-full max-w-md shadow-lg hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                <input
                  type="email"
                  placeholder="Enter your email for updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-6 py-3 text-base focus:outline-none text-slate-900 placeholder-slate-400"
                />
                <button className="px-7 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-full text-base hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="animate-slide-in-right relative h-96 lg:h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-transparent rounded-3xl opacity-30 blur-2xl"></div>
              <div className="relative z-10">
                <div className="text-8xl md:text-9xl lg:text-[150px] animate-float filter drop-shadow-2xl">🚂</div>
              </div>
            </div>
          </div>

          {/* Premium Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-32">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">{stat.icon}</div>
                  <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-transparent rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20 animate-slide-in-up">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">How TicketShare Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Get started in just 4 simple steps. It takes less than 5 minutes to list or book a ticket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent -translate-y-1/2"></div>
            
            {steps.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center group hover:shadow-2xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-3 relative overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  
                  <div className="relative z-10">
                    {/* Number Badge */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 text-white font-black text-2xl mb-6 group-hover:scale-125 group-hover:shadow-lg transition-all duration-300">
                      {item.step}
                    </div>
                    
                    <div className="text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{item.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 font-light">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tickets Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">Hot Deals Right Now</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Browse trending tickets and find amazing deals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                train: 'Rajdhani Express',
                number: '12306',
                from: 'Delhi',
                to: 'Mumbai',
                date: 'Jan 15, 2024',
                price: 2500,
                originalPrice: 4200,
                seats: 2,
                color: 'from-blue-500 to-blue-600',
              },
              {
                train: 'Shatabdi Express',
                number: '12001',
                from: 'Mumbai',
                to: 'Bangalore',
                date: 'Jan 18, 2024',
                price: 1800,
                originalPrice: 3200,
                seats: 1,
                color: 'from-purple-500 to-purple-600',
              },
              {
                train: 'Garib Rath',
                number: '14306',
                from: 'Kolkata',
                to: 'Hyderabad',
                date: 'Jan 20, 2024',
                price: 1200,
                originalPrice: 2100,
                seats: 3,
                color: 'from-orange-500 to-orange-600',
              },
            ].map((ticket, idx) => (
              <div key={idx} className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-4">
                {/* Premium Top Gradient */}
                <div className={`h-44 bg-gradient-to-br ${ticket.color} opacity-90 relative overflow-hidden group-hover:opacity-100 transition-opacity`}>
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.05)_25%,transparent_25%)] bg-[size:2rem_2rem]"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">🚂</span>
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 inline-block px-4 py-2 bg-white bg-opacity-95 backdrop-blur text-white font-black rounded-full text-sm shadow-lg">
                    <span className="bg-gradient-to-r from-green-500 to-green-600 text-transparent bg-clip-text">
                      {Math.round((1 - ticket.price / ticket.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{ticket.train}</h3>
                      <p className="text-sm text-slate-500 font-medium">Train #{ticket.number}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6 text-slate-700 font-semibold">
                    <span>{ticket.from}</span>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white text-lg">→</span>
                    <span>{ticket.to}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-6 py-4 border-y border-slate-100">
                    <span className="text-sm text-slate-600 font-medium">{ticket.date}</span>
                    <span className="text-sm text-slate-600 font-medium">{ticket.seats} seats</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text">₹{ticket.price}</span>
                      <span className="text-sm text-slate-500 line-through ml-3 font-semibold">₹{ticket.originalPrice}</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-400 transition-all duration-300 transform hover:scale-105 active:scale-95">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">Why Choose TicketShare?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Experience the smartest way to buy and sell train tickets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-4 overflow-hidden"
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-600 font-light leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -bottom-40 -right-32 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">What Users Say</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
              Join thousands of happy travelers who've already saved money
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className="group relative bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-3 overflow-hidden"
              >
                {/* Decorative Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-slate-500 font-medium">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-slate-700 italic mb-6 font-light leading-relaxed">"{testimonial.text}"</p>
                
                <div className="text-xl flex gap-1">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 group-hover:animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>★</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-blue-400 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-purple-400 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Ready to Save on Train Tickets?
            </h2>
            <p className="text-2xl mb-12 text-blue-100 font-light leading-relaxed">
              Join thousands of travelers enjoying amazing deals. Start saving immediately!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={onGetStarted} 
                className="group px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-blue-400 transition-all duration-300 transform hover:scale-110 active:scale-100 flex items-center justify-center gap-2"
              >
                <span className="group-hover:scale-125 transition-transform">🎫</span>
                Get Started Now
              </button>
              <button className="px-10 py-5 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105 active:scale-100">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 border-t border-slate-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🚂</span>
                <span className="font-black text-2xl bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">TicketShare</span>
              </div>
              <p className="text-slate-400 text-sm font-light leading-relaxed">Smart train ticket rebooking platform for smart travelers. Save money, help others travel.</p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Product</h4>
              <ul className="text-slate-400 text-sm space-y-3 font-light">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><span>→</span> Browse Tickets</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><span>→</span> Sell Ticket</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><span>→</span> How It Works</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Company</h4>
              <ul className="text-slate-400 text-sm space-y-3 font-light">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><span>→</span> About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><span>→</span> Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><span>→</span> Careers</a></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Legal</h4>
              <ul className="text-slate-400 text-sm space-y-3 font-light">
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><span>→</span> Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><span>→</span> Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"><span>→</span> Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-400 text-sm font-light">&copy; 2024 TicketShare. All rights reserved.</p>
              <p className="text-slate-400 text-sm font-light">Made with <span className="text-pink-400">❤</span> for smart travelers</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
