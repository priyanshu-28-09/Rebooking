import { useState } from 'react';

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-32 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="fade-in">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-blue-50 text-primary rounded-full text-sm font-semibold">
                  🚀 Revolutionizing Train Ticket Rebooking
                </span>
              </div>
              
              <h1 className="heading-1 mb-4 text-foreground">
                Smart Train Ticket Rebooking Platform
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                Buy, sell, and rebook unused train tickets securely. Save up to 60% on tickets while helping others travel affordably.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button onClick={onGetStarted} className="btn btn-primary btn-large">
                  🎫 Find Tickets
                </button>
                <button className="btn btn-outline btn-large">
                  📤 Sell Your Ticket
                </button>
              </div>

              {/* Newsletter */}
              <div className="flex gap-2 bg-card p-1 rounded-full border border-border w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none text-text-primary"
                />
                <button className="btn btn-primary px-6 py-2 text-sm">
                  Notify Me
                </button>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="slide-in-right">
              <div className="relative h-96 lg:h-full">
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-10"></div>
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-9xl animate-bounce">🚂</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
            {stats.map((stat, idx) => (
              <div key={idx} className="card text-center">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">How TicketShare Works</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Get started in just 4 simple steps. It takes less than 5 minutes to list or book a ticket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="card text-center group hover:shadow-xl transition">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition">{item.icon}</div>
                  <div className="text-4xl font-bold text-primary mb-3">{item.step}</div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 text-3xl text-primary">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Why Choose TicketShare?</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Experience the smartest way to buy and sell train tickets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="card group hover:shadow-lg transition">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{benefit.title}</h3>
                <p className="text-sm text-text-secondary">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-primary bg-opacity-5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4 text-text-primary">What Users Say</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Join thousands of happy travelers who've already saved money
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="card glass">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-text-primary">{testimonial.name}</p>
                    <p className="text-sm text-text-secondary">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-text-secondary italic">"{testimonial.text}"</p>
                <div className="text-yellow-400 text-sm mt-3">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container text-center">
          <h2 className="heading-2 text-white mb-4">Ready to Save on Train Tickets?</h2>
          <p className="text-lg mb-8 text-blue-100">
            Join TicketShare today and start saving immediately
          </p>
          <button onClick={onGetStarted} className="btn btn-outline text-white border-white hover:bg-white hover:text-primary">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">TicketShare</h3>
              <p className="text-gray-400 text-sm">Smart train ticket rebooking platform for smart travelers.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Browse Tickets</a></li>
                <li><a href="#" className="hover:text-white transition">Sell Ticket</a></li>
                <li><a href="#" className="hover:text-white transition">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 TicketShare. All rights reserved. | Made with ❤️ for smart travelers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
