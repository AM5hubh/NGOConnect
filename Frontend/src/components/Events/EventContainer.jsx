import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventContainer = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_RENDER_PATH}/event/get`);
      console.log(response)
      if (response.data.success) {
        setEvents(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch events');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not fetch events');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date not specified';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return 'Time not specified';
    return timeStr.slice(0, 5);
  };

  const getEventStatus = (eventDate) => {
    const now = new Date();
    const eventDateTime = new Date(eventDate);
    if (eventDateTime > now) {
      return 'upcoming';
    }
    return 'past';
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      (event.title?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (event.description?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (event.location?.toLowerCase().includes(searchTerm.toLowerCase()) || '');
    
    if (filter === 'all') return matchesSearch;
    
    const eventStatus = getEventStatus(event.date);
    return matchesSearch && eventStatus === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Events</h1>
        <p className="text-gray-600 mt-2">Browse and discover events</p>
      </div>

      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="text-sm text-gray-600">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          <p className="text-xl">No events found</p>
          <p className="mt-2">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-800">
                      {event.category || 'Uncategorized'}
                    </span>
                    <span className={`px-2 py-1 text-sm rounded ${
                      getEventStatus(event.date) === 'upcoming' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {getEventStatus(event.date) === 'upcoming' ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 text-gray-600">
                  <p className="line-clamp-2">{event.description || 'No description provided'}</p>
                  
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDate(event.date)}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatTime(event.time)}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location || 'Location not specified'}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{event.maxParticipants ? `${event.maxParticipants} participants` : 'Unlimited participants'}</span>
                  </div>
                </div>

                {event.requirements && (
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Requirements:</h4>
                    <p className="text-sm text-gray-600">{event.requirements}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventContainer;