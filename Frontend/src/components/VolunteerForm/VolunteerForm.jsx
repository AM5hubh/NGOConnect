// VolunteerForm.jsx
import React, { useState,useContext,useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../../../context/userContext.jsx';
const VolunteerForm = () => {
  // const { user } = useContext(UserContext);
  const [user, setUser] = useState(null);

  // Fetch the current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_RENDER_PATH}/users/current-user`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
             // Include cookies (if using refresh tokens)
          }
        );
        setUser(res.data.data); // Set the user data in state
      } catch (error) {
        console.error("Error fetching current user:", error);
        setUser(null); // Clear the user state if fetching fails
      }
    };

    if (!user) {
      fetchUser(); // Fetch user if not already fetched
    }
  },[user]);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    governmentId: '',
    idType: 'driver_license',
    previousVolunteer: false,
    criminalRecord: false,
    skills: [],
    availability: {
      weekdays: false,
      weekends: false,
      mornings: false,
      afternoons: false,
      evenings: false
    },
    references: [{
      name: '',
      relationship: '',
      phone: '',
      email: ''
    }]
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('submitting');

    try {
      const response = await axios.post(`${import.meta.env.VITE_RENDER_PATH}/volunteer/register`, formData);
      setSubmitStatus('success');
      console.log('Registration successful:', response.data);
    } catch (error) {
      setSubmitStatus('error');
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'An error occurred during registration.' });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Volunteer Registration Form</h1>
      
      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Registration submitted successfully! We'll contact you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user?.fullname}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                disabled
              />
            </div>
            <div>
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={user?.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                disabled
              />
            </div>
            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </section>

        {/* Address */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Emergency Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="emergencyContact.name"
                value={formData.emergencyContact.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Relationship</label>
              <input
                type="text"
                name="emergencyContact.relationship"
                value={formData.emergencyContact.relationship}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">Phone</label>
              <input
                type="tel"
                name="emergencyContact.phone"
                value={formData.emergencyContact.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </section>

        {/* Background Check Information */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Background Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Government ID Number</label>
              <input
                type="text"
                name="governmentId"
                value={formData.governmentId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-2">ID Type</label>
              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="driver_license">Driver's License</option>
                <option value="state_id">State ID</option>
                <option value="passport">Passport</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="criminalRecord"
                checked={formData.criminalRecord}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label>Have you ever been convicted of a felony?</label>
            </div>
          </div>
        </section>

        {/* Availability */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Availability</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="availability.weekdays"
                checked={formData.availability.weekdays}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label>Weekdays</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="availability.weekends"
                checked={formData.availability.weekends}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label>Weekends</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="availability.mornings"
                checked={formData.availability.mornings}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label>Mornings</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="availability.afternoons"
                checked={formData.availability.afternoons}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label>Afternoons</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="availability.evenings"
                checked={formData.availability.evenings}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label>Evenings</label>
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={submitStatus === 'submitting'}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default VolunteerForm;