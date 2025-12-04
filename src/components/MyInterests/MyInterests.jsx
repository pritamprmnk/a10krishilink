import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { Eye } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
const API_BASE = "https://krishi-link-server-eight.vercel.app";


export default function MyInterests() {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [interests, setInterests] = useState([]);
  const [originalInterests, setOriginalInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const [sortBy, setSortBy] = useState("latest");
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
      .then((data) => {
        setOriginalInterests(data || []);
        setInterests(data || []);
      })
      .catch(() => toast.error("Could not load your interests"))
      .finally(() => setLoading(false));
  }, [authLoading, userEmail]);

  useEffect(() => {
    if (!originalInterests || originalInterests.length === 0) return;

    let sorted = [...originalInterests];

    if (sortBy === "latest") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (sortBy === "oldest") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (sortBy === "status") {
      const order = { pending: 1, accepted: 2, rejected: 3 };
      sorted.sort((a, b) => order[a.status] - order[b.status]);
    }

    if (sortBy === "az") {
      sorted.sort((a, b) =>
        (a.cropName || "").localeCompare(b.cropName || "")
      );
    }

    setInterests(sorted);
  }, [sortBy, originalInterests]);

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

      setOriginalInterests((prev) => prev.filter((i) => i._id !== id));
      setInterests((prev) => prev.filter((i) => i._id !== id)); 
      toast.success("Interest cancelled");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-green-500 tracking-wide">
        My Interests
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        <div className="mb-5 flex justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border py-2 rounded-md shadow-md text-gray-700 bg-white"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="status">Status (Pending → Accepted → Rejected)</option>
            <option value="az">Crop Name A–Z</option>
          </select>
        </div>

        {interests.length === 0 ? (
          <div className="py-14 text-center text-gray-500 italic text-lg">
            You haven't shown interest in any crop yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">
                    Crop
                  </th>
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">
                    Owner
                  </th>
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">
                    Qty
                  </th>
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">
                    Message
                  </th>
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">
                    Status
                  </th>
                  <th className="py-4 px-3 text-left text-gray-700 font-semibold">
                    Date
                  </th>
                  <th className="py-4 px-3 text-right text-gray-700 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {interests.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-100 transition-all duration-200"
                  >
                    <td className="py-4 px-3 font-medium text-gray-900">
                      {item.cropName}
                    </td>
                    <td className="py-4 px-3 text-gray-700">
                      {item.sellerEmail}
                    </td>
                    <td className="py-4 px-3 text-gray-700">{item.quantity}</td>
                    <td className="py-4 px-3 text-gray-700">{item.message}</td>

                    <td className="py-4 px-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${badgeClass(
                          item.status
                        )}`}
                      >
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
