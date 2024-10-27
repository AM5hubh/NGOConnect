import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Heart, Trophy, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonationDashboard = () => {
  // Sample data - in a real app this would come from your backend
  const monthlyData = [
    { month: 'Jan', donations: 25000, volunteers: 150, projects: 12 },
    { month: 'Feb', donations: 32000, volunteers: 180, projects: 15 },
    { month: 'Mar', donations: 28000, volunteers: 210, projects: 18 },
    { month: 'Apr', donations: 42000, volunteers: 250, projects: 22 },
    { month: 'May', donations: 38000, volunteers: 280, projects: 25 },
    { month: 'Jun', donations: 45000, volunteers: 320, projects: 28 },
  ];

  const stats = {
    totalDonations: 210000,
    totalVolunteers: 320,
    successfulProjects: 28,
    avgDonation: 656
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Making Change Together</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Coins className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Donations</p>
              <h3 className="text-2xl font-bold">${stats.totalDonations.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Volunteers</p>
              <h3 className="text-2xl font-bold">{stats.totalVolunteers}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Projects Completed</p>
              <h3 className="text-2xl font-bold">{stats.successfulProjects}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Donation</p>
              <h3 className="text-2xl font-bold">${stats.avgDonation}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Donations Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold mb-4">Donation Trends</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="donations" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white mt-6">
        <h2 className="text-2xl font-bold mb-4">Your Impact</h2>
        <p className="text-lg mb-6">
          Together, we're making a difference. Every donation helps us connect more volunteers 
          with organizations that need them most.
        </p>
        <Link to='/donate' className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold 
                         hover:bg-blue-50 transition-colors">
          Donate Now
        </Link>
      </div>
    </div>
  );
};

export default DonationDashboard;