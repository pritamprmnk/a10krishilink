import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:3000";

export default function MyInterests() {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const userEmail = user?.email || "";

  useEffect(() => {
    if (authLoading) return;

    if (!userEmail) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${API_BASE}/myInterests/${encodeURIComponent(userEmail)}`)
      .then((res) => res.json())
      .then((data) => setInterests(data || []))
      .catch(() => toast.error("Could not load your interests"))
      .finally(() => setLoading(false));
  }, [authLoading, userEmail]);

  const badgeClass = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700 border border-green-300";
      case "rejected":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    }
  };

  const handleView = (cropId) => {
    if (!cropId) return;
    window.location.href = `/crop/${cropId}`;
  };

  const handleCancel = async (id) => {
    if (!id || !userEmail) return;

    setDeleting(id);

    try {
      const resp = await fetch(
        `${API_BASE}/interest/${encodeURIComponent(id)}?email=${encodeURIComponent(
          userEmail
        )}`,
        { method: "DELETE" }
      );

      const body = await resp.json();
      if (!resp.ok) throw new Error(body?.message);

      setInterests((prev) => prev.filter((i) => i._id !== id));
      toast.success("Interest cancelled");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-green-500 tracking-wide">
        My Interests
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">

        {/* LOADING STATES */}
        {authLoading ? (
          <div className="py-14 text-center text-gray-600 text-lg animate-pulse">
            Loading account...
          </div>
        ) : !userEmail ? (
          <div className="py-14 text-center text-gray-600 text-lg">
            You must be signed in to view your interests.
          </div>
        ) : loading ? (
          <div className="py-14 text-center text-gray-500 text-lg animate-pulse">
            Loading...
          </div>
        ) : interests.length === 0 ? (
          <div className="py-14 text-center text-gray-500 italic text-lg">
            You haven't shown interest in any crop yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">Crop</th>
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">Owner</th>
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">Qty</th>
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">Message</th>
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">Status</th>
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">Date</th>
                  <th className="py-4 px-3 text-right text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {interests.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-100 transition-all duration-200"
                  >
                    <td className="py-4 px-3 font-medium text-gray-900">{item.cropName}</td>
                    <td className="py-4 px-3 text-gray-700">{item.sellerEmail}</td>
                    <td className="py-4 px-3 text-gray-700">{item.quantity}</td>
                    <td className="py-4 px-3 text-gray-700">{item.message}</td>

                    <td className="py-4 px-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 px-3 text-gray-700">{item.date}</td>

                    <td className="py-4 px-3 text-right space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition"
                        onClick={() => handleView(item.cropId)}
                      >
                        <Eye size={20} />
                      </button>

                      {item.status === "pending" && (
                        <button
                          className="px-3 py-1 border border-red-300 rounded-md text-red-600 hover:bg-red-50 transition"
                          onClick={() => handleCancel(item._id)}
                          disabled={deleting === item._id}
                        >
                          {deleting === item._id ? "Cancelling..." : "Cancel"}
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
