import React, { useState, useEffect } from 'react';

const NGOcards = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/ngouser/getallngos');
        const data = await response.json();
        setArticles(data.data);
      } catch (err) {
        setError('Failed to fetch NGOs');
      }
    };

    fetchArticles();
  }, []);

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  if (!articles.length) {
    return <p className="text-center">No NGO found.</p>;
  }

  const filteredArticles = articles.filter(article =>
    article.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" mx-auto p-6 bg-[#ede8f5] rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-[#3d52a0] mb-4">NGO Registered on our website</h1>
      <input
        type="text"
        placeholder="Search NGOs"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={article.imageUrl} alt={article.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-bold mb-2">{article.name}</h2>
            <p className="text-gray-700">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NGOcards;