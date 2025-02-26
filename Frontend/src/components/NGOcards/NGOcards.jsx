import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Globe, Phone, Mail, ExternalLink } from 'lucide-react';

const NGOCards = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNGO, setSelectedNGO] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://ngoconnect.onrender.com/api/v1/ngouser/getallngos');
        const data = await response.json();
        setArticles(data.data);
      } catch (err) {
        setError('Failed to fetch NGOs');
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article =>
    article.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Modal Component
  const DetailModal = ({ ngo, onClose }) => {
    if (!ngo) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{ngo.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="aspect-video mb-6 rounded-xl overflow-hidden">
              <img
                src={ngo.imageUrl}
                alt={ngo.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-gray-600 leading-relaxed">{ngo.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {ngo.contact && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-5 h-5" />
                    <a href={`tel:${ngo.contact}`} className="hover:text-blue-500">{ngo.contact}</a>
                  </div>
                )}
                
                {ngo.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span>{ngo.email}</span>
                  </div>
                )}
                
                {ngo.website && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-5 h-5" />
                    <a href={ngo.website} target="_blank" rel="noopener noreferrer" 
                       className="hover:text-blue-500">Visit Website</a>
                  </div>
                )}

                {ngo.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{ngo.location}</span>
                  </div>
                )}
              </div>

              {/* Additional NGO details can be added here */}
            </div>
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

  if (!articles.length) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No NGOs found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-400  to-purple-100">
      <div className=" mx-auto p-6 md:p-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            NGO Directory
            <span className="block text-lg font-normal text-gray-600 mt-2">
              Discover and connect with organizations making a difference
            </span>
          </h1>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search NGOs by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white"
            />
          </div>
        </div>

        {/* NGO Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedNGO(article)}
              className="group bg-white/50 backdrop-blur-sm p-2 hover:scale-95 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:bg-gray-100 cursor-pointer transition-transfrom duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.name}
                  className="w-full h-full object-contain rounded-2xl overflow-hidden"
                />
                {article.location && (
                  <div className="absolute bottom-3 left-3 bg-white/90 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{article.location}</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                    {article.name}
                  </h2>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                </div>
                <p className="text-gray-600 line-clamp-2">{article.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedNGO && (
          <DetailModal
            ngo={selectedNGO}
            onClose={() => setSelectedNGO(null)}
          />
        )}
      </div>
    </div>
  );
};

export default NGOCards;