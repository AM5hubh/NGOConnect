import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    date: ''
  });
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams(filters).toString();
        const response = await axios.get(`/api/events?${params}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
    fetchEvents();
  }, [filters]);
  
  const handleRegister = async (eventId) => {
    try {
      await axios.post(`/api/events/${eventId}/register`);
      // Refresh events list
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Volunteer Opportunities</h1>
        
        <div className="flex gap-4 mb-4">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">All Categories</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Environment">Environment</option>
            <option value="Social Welfare">Social Welfare</option>
          </select>
          
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
          </select>
          
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="border rounded p-2"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {events.map(event => (
          <EventCard
            key={event._id}
            event={event}
            onRegister={handleRegister}
          />
        ))} */}
      </div>
    </div>
  );
};

export default Events;