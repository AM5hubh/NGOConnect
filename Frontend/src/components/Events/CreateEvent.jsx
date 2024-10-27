import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventForm from './EventForm';

const CreateEvent = () => {
  const navigate = useNavigate();

  const handleCreateEvent = async (data) => {
    try {
      // Convert skills from string to array
      const formattedData = {
        ...data,
        skills: data.skills.split(',').map(skill => skill.trim()).filter(Boolean)
      };

      await axios.post('/api/ngo/events', formattedData);
      alert('Event created successfully!');
      navigate('/ngo/events');
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating event');
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
        <EventForm onSubmit={handleCreateEvent} />
      </div>
    </div>
  );
};

export default CreateEvent;