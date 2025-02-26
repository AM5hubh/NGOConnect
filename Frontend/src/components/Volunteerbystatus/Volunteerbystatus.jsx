import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, Loader2, X } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      <div className="relative z-50 w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold">Volunteer Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const VolunteerDashboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStatus, setActiveStatus] = useState('pending');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  useEffect(() => {
    fetchVolunteers(activeStatus);
  }, [activeStatus]);

  const fetchVolunteers = async (status) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_RENDER_PATH}/volunteer/getbystatus`, {
        params: { status },
        headers: { Authorization: `Bearer ${token}` },
      });
      setVolunteers(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (volunteerId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${import.meta.env.VITE_RENDER_PATH}/volunteer/getbystatus/${volunteerId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchVolunteers(activeStatus);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const VolunteerDetailsModal = ({ volunteer, onClose }) => {
    if (!volunteer) return null;

    const formatDate = (date) => {
      return format(new Date(date), 'MMM dd, yyyy');
    };

    const availabilityLabels = {
      weekdays: 'Weekdays',
      weekends: 'Weekends',
      mornings: 'Mornings',
      afternoons: 'Afternoons',
      evenings: 'Evenings'
    };

    return (
      <Modal isOpen={!!volunteer} onClose={onClose}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{volunteer.firstName} {volunteer.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{volunteer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{volunteer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{formatDate(volunteer.dateOfBirth)}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p className="font-medium">{volunteer.address}</p>
            <p className="font-medium">{volunteer.city}, {volunteer.state} {volunteer.zipCode}</p>
          </div>

          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Emergency Contact</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{volunteer.emergencyContact.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Relationship</p>
                <p className="font-medium">{volunteer.emergencyContact.relationship}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{volunteer.emergencyContact.phone}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Identification</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ID Type</p>
                <p className="font-medium">{volunteer.idType.replace('_', ' ').toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Government ID</p>
                <p className="font-medium">{volunteer.governmentId}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Previous Volunteer</p>
                <p className="font-medium">{volunteer.previousVolunteer ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Criminal Record</p>
                <p className="font-medium">{volunteer.criminalRecord ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {volunteer.skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Availability</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(volunteer.availability).map(([key, value]) => (
                value && (
                  <span key={key} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {availabilityLabels[key]}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Volunteer Management Dashboard</h1>
      </div>

      <div className="p-6">
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          {['pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeStatus === status
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {status === 'pending' && <AlertCircle className="w-4 h-4" />}
              {status === 'approved' && <CheckCircle className="w-4 h-4" />}
              {status === 'rejected' && <XCircle className="w-4 h-4" />}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 text-center">No volunteers found with the {activeStatus} status</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {volunteers.map((volunteer) => (
                    <tr 
                      key={volunteer._id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedVolunteer(volunteer)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {volunteer.firstName} {volunteer.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volunteer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(volunteer.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {volunteer.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusUpdate(volunteer._id, 'approved');
                              }}
                              className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Approve
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusUpdate(volunteer._id, 'rejected');
                              }}
                              className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {volunteer.status === 'approved' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(volunteer._id, 'rejected');
                            }}
                            className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Reject
                          </button>
                        )}
                        {volunteer.status === 'rejected' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(volunteer._id, 'approved');
                            }}
                            className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <VolunteerDetailsModal 
        volunteer={selectedVolunteer} 
        onClose={() => setSelectedVolunteer(null)} 
      />
    </div>
  );
};

export default VolunteerDashboard;