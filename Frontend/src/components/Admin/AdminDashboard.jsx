import React, { useState } from 'react';
import { 
    Users, 
    Building2, 
    ShieldCheck, 
    Search,
    Menu,
    X,
    Plus,
    Edit,
    Trash2
} from 'lucide-react';
import VolunteerDashboard from '../Volunteerbystatus/Volunteerbystatus';
import Alladmins from '../Alladmins/Alladmins';
import NGOCards from '../NGOcards/NGOcards';

const AdminDashboard = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderDashboardContent = () => (
        <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded">
                            <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-gray-500 text-sm">Total NGOs</h3>
                            <p className="text-2xl font-semibold">0</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded">
                            <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-gray-500 text-sm">Active Volunteers</h3>
                            <p className="text-2xl font-semibold">0</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded">
                            <ShieldCheck className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-gray-500 text-sm">Admins</h3>
                            <p className="text-2xl font-semibold">0</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
                    <div className="space-y-4">
                        {/* Add your recent activities list here */}
                    </div>
                </div>
            </div>
        </>
    );

    const renderNGOsContent = () => (
        <div className="bg-white rounded-lg shadow">
            <NGOCards />
        </div>
    );

    const renderVolunteersContent = () => (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Volunteers List</h2>
                    {/* <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Volunteer
                    </button> */}
                </div>
                <VolunteerDashboard />
            </div>
        </div>
    );

    const renderAdminsContent = () => (
        <div className="bg-white rounded-lg shadow">
            <Alladmins />
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'ngos':
                return renderNGOsContent();
            case 'volunteers':
                return renderVolunteersContent();
            case 'admins':
                return renderAdminsContent();
            default:
                return renderDashboardContent();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <nav className="bg-white shadow-sm fixed w-full top-0 z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <button 
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                className="md:hidden p-2"
                            >
                                {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                            <h1 className="text-xl font-bold text-blue-600 ml-2">NGOConnect Admin</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="hidden md:block w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Search className="hidden md:block h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                            </div>
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">A</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div className={`absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition duration-200 ease-in-out z-30`}>
                <div className="w-64 h-full bg-white shadow-lg pt-20">
                    <div className="px-4">
                        <div className="space-y-2">
                            {['dashboard', 'ngos', 'volunteers', 'admins'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm ${
                                        activeTab === tab ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab === 'dashboard' && <ShieldCheck className="h-5 w-5" />}
                                    {tab === 'ngos' && <Building2 className="h-5 w-5" />}
                                    {tab === 'volunteers' && <Users className="h-5 w-5" />}
                                    {tab === 'admins' && <ShieldCheck className="h-5 w-5" />}
                                    <span className="capitalize">{tab}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="md:ml-64 pt-16 px-4">
                <div className="max-w-7xl mx-auto py-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;