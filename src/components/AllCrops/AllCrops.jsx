import React, { useState, useEffect, useMemo } from 'react';

export default function AllCropsPage() {
  const [cropsData, setCropsData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/allcrops')
      .then(res => res.json())
      .then(data => setCropsData(data))
      .catch(err => console.error(err));
  }, []);

  const filteredCrops = useMemo(() => {
    return cropsData.filter(crop =>
      crop.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, cropsData]);

  return (
    <div className="p-8 max-w-7xl mx-auto text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">All Crops</h1>

      <input
        type="text"
        placeholder="Search for crops..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-xl mb-6 shadow-sm text-gray-900"
      />

      {filteredCrops.length === 0 ? (
        <p className="text-gray-700 text-lg mt-6">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCrops.map((crop) => (
            <div key={crop._id} className="bg-white rounded-2xl shadow p-4 border border-gray-200">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-40 object-cover rounded-xl"
              />
              <h2 className="text-lg font-semibold mt-3 text-gray-900">{crop.name}</h2>
              <p className="text-sm text-gray-700">Location: {crop.location}</p>
              <p className="text-sm text-gray-700">Price: {crop.pricePerUnit} / {crop.unit}</p>
              <p className="text-sm text-gray-700 mb-3">Quantity: {crop.quantity}</p>
              <a href={`/crop/${crop._id}`} className="bg-green-300 hover:bg-green-400 text-green-900 font-medium w-full py-2 rounded-xl text-center block">View Details</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
