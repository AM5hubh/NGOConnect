import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Phone, Mail, Calendar, Clock, Badge, AlertCircle } from 'lucide-react';

const VolunteerDirectory = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/volunteer/allvolunteers');
        const data = await response.json();
        setVolunteers(data.data);
      } catch (err) {
        setError('Failed to fetch Volunteers');
      }
    };

    fetchVolunteers();
  }, []);

  const filteredVolunteers = volunteers.filter(volunteer =>
    `${volunteer.firstName} ${volunteer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Badge Component
  const Badge = ({ children, variant = "default", className = "" }) => {
    const baseStyles = "px-2 py-1 rounded-full text-sm font-medium";
    const variants = {
      default: "bg-blue-100 text-blue-800",
      secondary: "bg-gray-100 text-gray-800",
      outline: "border border-gray-200 text-gray-600"
    };
    return (
      <span className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </span>
    );
  };

  // Section Component
  const Section = ({ title, children, className = "" }) => {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {children}
      </div>
    );
  };

  // Modal Component
  const DetailModal = ({ volunteer, onClose }) => {
    if (!volunteer) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {volunteer.firstName} {volunteer.lastName}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Status Badges */}
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(volunteer.status)}`}>
                {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
              </span>
              {volunteer.emailverified && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Email Verified
                </span>
              )}
            </div>

            {/* Personal Information */}
            <Section title="Personal Information">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span>{volunteer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span>{volunteer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>DOB: {formatDate(volunteer.dateOfBirth)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{volunteer.address}, {volunteer.city}, {volunteer.state} {volunteer.zipCode}</span>
                </div>
              </div>
            </Section>

            {/* Emergency Contact */}
            <Section title="Emergency Contact">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">{volunteer.emergencyContact.name}</p>
                  <p className="text-gray-600">{volunteer.emergencyContact.relationship}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span>{volunteer.emergencyContact.phone}</span>
                </div>
              </div>
            </Section>

            {/* Identification */}
            <Section title="Identification">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Badge className="w-5 h-5 text-gray-500" />
                  <span>{volunteer.idType.replace('_', ' ').toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-gray-500" />
                  <span>ID: {volunteer.governmentId}</span>
                </div>
              </div>
            </Section>

            {/* Skills and Availability */}
            <Section title="Skills & Availability">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Availability</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(volunteer.availability).map(([key, value]) => (
                      value && (
                        <Badge key={key} variant="outline">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Badge>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* Additional Information */}
            <Section title="Additional Information">
              <div className="space-y-2">
                <p>Previous Volunteer Experience: {volunteer.previousVolunteer ? 'Yes' : 'No'}</p>
                <p>Criminal Record: {volunteer.criminalRecord ? 'Yes' : 'No'}</p>
              </div>
            </Section>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Volunteer Directory
            <span className="block text-lg font-normal text-gray-600 mt-2">
              Connect with our dedicated volunteers
            </span>
          </h1>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search volunteers by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white"
            />
          </div>
        </div>

        {/* Volunteer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVolunteers.map((volunteer) => (
            <div
              key={volunteer._id}
              onClick={() => setSelectedVolunteer(volunteer)}
              className="group bg-white/80 backdrop-blur-sm hover:bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {volunteer.firstName} {volunteer.lastName}
                    </h2>
                    <p className="text-gray-600">{volunteer.city}, {volunteer.state}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(volunteer.status)}`}>
                    {volunteer.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{volunteer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{volunteer.phone}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {volunteer.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                    {volunteer.skills.length > 3 && (
                      <Badge variant="secondary">
                        +{volunteer.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedVolunteer && (
          <DetailModal
            volunteer={selectedVolunteer}
            onClose={() => setSelectedVolunteer(null)}
          />
        )}
      </div>
    </div>
  );
};

export default VolunteerDirectory;