//admin page
import React, { useState } from 'react';
import { 
  Users, AlertTriangle, DollarSign, FileText, BarChart2, Bell, 
  Package, MessageSquare, Shield, BookOpen, Settings
} from 'lucide-react';
import UserCardsAdmin from './Auth/UserCardsAdmin';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('user');

  const tabs = [
    { id: 'user', label: 'User Management', icon: Users },
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'user':
        return (
            <UserCardsAdmin />
        );
      case 'relief':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Disaster Relief Operations</h3>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Create Relief Campaign
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors ml-4">
              Track Operations
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors ml-4">
              Assign Volunteers
            </button>
          </div>
        );
      // Add cases for other tabs here
      default:
        return <p>Select a tab to view options</p>;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl flex items-center justify-center font-bold text-center mb-8 text-indigo-800">
           <span ><img src='/vcetlogo.png' className='w-24 h-24 mr-2'/></span>LegacyNet Admin Dashboard
        </h1>
        
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 bg-indigo-700 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${
                      activeTab === tab.id ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="mr-3" size={20} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="w-full md:w-3/4 p-6">
              <div className="bg-indigo-100 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-indigo-800">Welcome, Admin</h2>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center">
                    <Settings className="mr-2" size={20} />
                    Settings
                  </button>
                </div>
              </div>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;