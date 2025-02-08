import React from 'react'
import { Vote, Users, CheckSquare, BarChart3, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function Home() {
const navigate = useNavigate();

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-gray-50 rounded-xl text-center hover:shadow-lg transition-shadow">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StatCard = ({ number, label }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm">
    <div className="text-3xl font-bold text-orange-500 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
  )
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-green-50">
    {/* Hero Section */}
    <div 
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1663126272118-1df214328644?q=80&w=1842&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
          Your Vote, India's Future
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Democracy thrives when every voice is heard. Be part of the world's largest democratic exercise.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105" onClick={() => navigate("/getregister")}>
          Register Now
        </button>
      </div>
    </div>

    {/* Key Features */}
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Empowering Indian Democracy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Vote className="w-8 h-8 text-orange-500" />}
            title="Every Vote Counts"
            description="Your vote is your voice in shaping India's future. Make it count in the world's largest democracy."
          />
          <FeatureCard 
            icon={<Users className="w-8 h-8 text-green-500" />}
            title="Informed Decisions"
            description="Access comprehensive information about candidates and electoral processes."
          />
          <FeatureCard 
            icon={<CheckSquare className="w-8 h-8 text-blue-500" />}
            title="Secure Voting"
            description="Your right to vote is protected by robust security measures and transparent processes."
          />
        </div>
      </div>
    </div>

    {/* Statistics Section */}
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Democracy by the Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard number="900M+" label="Eligible Voters" />
          <StatCard number="1M+" label="Polling Stations" />
          <StatCard number="543" label="Lok Sabha Seats" />
          <StatCard number="35+" label="State & UT Elections" />
        </div>
      </div>
    </div>

    {/* Call to Action */}
    <div className="bg-blue-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Be the Change You Want to See
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Democracy is not just a right—it's a responsibility. Register to vote today and help build a stronger India.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg font-semibold">
            Register to Vote
          </button>
          <button className="bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold">
            Find Your Constituency
          </button>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-4">Promoting Democracy, Empowering Citizens</p>
        <div className="flex justify-center space-x-4">
          <Shield className="w-5 h-5" />
          <span>Independent. Non-partisan. For the people.</span>
        </div>
      </div>
    </footer>
  </div>
);


}

export default Home