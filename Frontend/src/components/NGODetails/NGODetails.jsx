    import React, { useEffect, useState } from 'react';
    import { useParams } from 'react-router-dom';
    import axios from 'axios';

    const NGODetails = () => {
    const { id } = useParams();
    const [ngo, setNGO] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNGODetails = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_RENDER_PATH}/ngouser/${id}`);
            setNGO(response.data);
        } catch (err) {
            setError('Failed to load NGO details. Please try again later.');
            console.error(err);
        }
        };

        fetchNGODetails();
    }, [id]);

    if (error) {
        return <p className="text-red-600 text-center">{error}</p>;
    }

    if (!ngo) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-[#3d52a0] mb-4">{ngo.name}</h1>
        <img src={ngo.imageUrl} alt={ngo.name} className="w-full h-60 object-cover rounded-lg mb-4" />
        <p className="text-gray-700 mb-4">{ngo.description}</p>
        <p className="text-gray-700 mb-4"><strong>Contact:</strong> {ngo.contact}</p>
        <p className="text-gray-700 mb-4"><strong>Email:</strong> {ngo.email}</p>
        <p className="text-gray-700 mb-4"><strong>Website:</strong> <a href={ngo.website} target="_blank" rel="noopener noreferrer">{ngo.website}</a></p>
        <p className="text-gray-700 mb-4"><strong>Instagram:</strong> <a href={ngo.instagram} target="_blank" rel="noopener noreferrer">{ngo.instagram}</a></p>
        <p className="text-gray-700 mb-4"><strong>Facebook:</strong> <a href={ngo.facebook} target="_blank" rel="noopener noreferrer">{ngo.facebook}</a></p>
        </div>
    );
    };

    export default NGODetails;