import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, Building, Clock, Award, HandHeart, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import VolunteerCard from '../VolunteerCard/VolunteerCard';

const VolunteerDashboard = () => {
  // Sample data
  const monthlyData = [
    { month: 'Jan', volunteers: 150, ngos: 12, hoursServed: 450 },
    { month: 'Feb', volunteers: 180, ngos: 15, hoursServed: 520 },
    { month: 'Mar', volunteers: 210, ngos: 18, hoursServed: 630 },
    { month: 'Apr', volunteers: 250, ngos: 22, hoursServed: 750 },
    { month: 'May', volunteers: 280, ngos: 25, hoursServed: 840 },
    { month: 'Jun', volunteers: 320, ngos: 28, hoursServed: 960 }
  ];

  const categoryData = [
    { name: 'Education', value: 35 },
    { name: 'Healthcare', value: 25 },
    { name: 'Environment', value: 20 },
    { name: 'Social Services', value: 20 }
  ];

  const COLORS = ['#2563eb', '#16a34a', '#7c3aed', '#dc2626'];

  const stats = {
    totalVolunteers: 1390,
    activeNGOs: 28,
    totalHours: 4150,
    avgHoursPerVolunteer: 18,
    successfulMatches: 892,
    upcomingEvents: 15
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Volunteer Impact Dashboard</h1>
        <p className="text-gray-600">Connecting Passionate Volunteers with Impactful NGOs</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Volunteers</p>
              <h3 className="text-2xl font-bold">{stats.totalVolunteers}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active NGOs</p>
              <h3 className="text-2xl font-bold">{stats.activeNGOs}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Hours Served</p>
              <h3 className="text-2xl font-bold">{stats.totalHours}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volunteer Growth Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Volunteer Growth</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="volunteers" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: '#2563eb' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NGO Categories */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">NGO Categories</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <HandHeart className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Successful Matches</p>
              <h3 className="text-2xl font-bold">{stats.successfulMatches}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Hours/Volunteer</p>
              <h3 className="text-2xl font-bold">{stats.avgHoursPerVolunteer}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
              <h3 className="text-2xl font-bold">{stats.upcomingEvents}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-8 text-white mt-6">
        <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-lg mb-6">
          Join our community of passionate volunteers and connect with NGOs that match your interests and skills.
        </p>
        <div className="flex space-x-4">
          <Link to="/Volunteerform" className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold 
                           hover:bg-purple-50 transition-colors">
            Volunteer Now
          </Link>
          <Link to="/register" className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold 
                           hover:bg-purple-600 transition-colors">
            Partner as NGO
          </Link>
        </div>
      </div>
      <VolunteerCard />
    </div>
  );
};

export default VolunteerDashboard;