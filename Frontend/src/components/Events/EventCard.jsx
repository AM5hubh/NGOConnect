import React from 'react';

const EventCard = ({ event, onRegister }) => {
  const isEventFull = event.registeredVolunteers.length >= event.requiredVolunteers;
  
  const getStatusColor = (status) => {
    const colors = {
      upcoming: 'bg-green-100 text-green-800',
      ongoing: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
      {event.images && event.images[0] && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.images[0]}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-2">Organized by {event.ngoId?.name || 'Unknown Organization'}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-900">
              {event.registeredVolunteers.length} / {event.requiredVolunteers}
            </span>
            <span className="text-xs text-gray-500">volunteers</span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.date)}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
        </div>
        
        {event.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.skills.map(skill => (
              <span 
                key={skill}
                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        
        <button
          onClick={() => onRegister(event._id)}
          disabled={isEventFull}
          className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition duration-200
            ${isEventFull 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
            }`}
        >
          {isEventFull ? 'Event Full' : 'Register as Volunteer'}
        </button>
        
        {event.contactPerson && (
          <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
            <p className="font-medium">Contact Person:</p>
            <p>{event.contactPerson.name} - {event.contactPerson.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;