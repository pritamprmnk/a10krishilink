import React, { useState, useEffect, useMemo } from "react";
import Loader from "../../components/Loader/Loader";
import { FiSearch } from "react-icons/fi";

export default function AllCropsPage() {
  const [cropsData, setCropsData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("https://krishi-link-server-eight.vercel.app/allcrops")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCropsData(data);
        } else {
          console.error("Invalid data:", data);
          setCropsData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredCrops = useMemo(() => {
    return cropsData.filter((crop) =>
      crop.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, cropsData]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto text-gray-900 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-green-500">All Crops</h1>

<div className="relative w-full md:w-1/2 lg:w-1/4 mb-6">
  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
  
  <input
    type="text"
    placeholder="Search for crops..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full p-3 pl-10 bg-gray-50 rounded-xl shadow-lg 
               focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
  />
</div>

      {filteredCrops.length === 0 ? (
        <div className="flex justify-center items-center min-h-[150px]">
           <p className="text-gray-600 text-lg">No results found.</p>
        </div>

      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {filteredCrops.map((crop) => (
            <div
              key={crop._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden 
                       transition-transform duration-300 
                       hover:scale-[1.03] hover:shadow-xl"
            >
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={
                    crop.image?.startsWith("data:image")
                      ? crop.image
                      : `data:image/jpeg;base64,${crop.image}`
                  }
                  alt={crop.name}
                  className="w-full h-44 object-cover transition-transform 
                             duration-300 hover:scale-110"
                />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-bold">{crop.name}</h2>

                <p className="text-sm mt-1">
                  <span className="font-medium">Location:</span> {crop.location}
                </p>

                <p className="text-sm">
                  <span className="font-medium">Price:</span>
                  {crop.pricePerUnit} / {crop.unit}
                </p>

                <p className="text-sm mb-3">
                  <span className="font-medium">Quantity:</span>
                  {crop.quantity}
                </p>

                <a
                  href={`/crop/${crop._id}`}
                  className="block text-center py-2 rounded-xl font-semibold
                             bg-green-400 text-green-900 transition-all duration-300
                             hover:bg-green-500 hover:text-white hover:shadow-md"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
