import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

export default function LatestCrops() {
  const [latestCrops, setLatestCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://krishi-link-server-eight.vercel.app/allcrops")
      .then((res) => res.json())
      .then((data) => {
        const lastSix = data.slice(0, 6);
        setLatestCrops(lastSix);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-16">
        <Loader />
      </div>
    );
  }

  return (
    <div className="py-16 bg-[#F4F6F5]">
      <h2 className="text-center text-3xl font-bold mb-10 text-green-500">
        Latest Crops
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {latestCrops.map((crop) => (
          <div
            key={crop._id}
            className="bg-white shadow-md rounded-xl overflow-hidden border"
          >
            <img
              src={
                crop.image?.startsWith("data:image")
                  ? crop.image
                  : `data:image/jpeg;base64,${crop.image}`
              }
              alt={crop.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="font-semibold text-lg text-black">{crop.name}</h3>

              <p className="text-sm text-gray-600 mt-1">
                Quantity: {crop.quantity} {crop.unit}
              </p>

              <p className="text-sm text-gray-600">
                Location: {crop.location}
              </p>

              <Link to={`/crop/${crop._id}`}>
                <button className="mt-4 w-full bg-green-400 hover:bg-green-500 transition-colors text-black font-medium py-2 rounded-md">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/allcrops">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow">
            View All Crops
          </button>
        </Link>
      </div>
    </div>
  );
}
