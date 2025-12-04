import React, { useEffect, useState } from "react";
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ReceivedInterests({ userEmail }) {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("latest");

  useEffect(() => {
    if (!userEmail) return;

    fetch(`https://krishi-link-server-eight.vercel.app/myinterests/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setInterests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userEmail]);

  const sortInterests = (type) => {
    let sorted = [...interests];

    if (type === "latest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (type === "status") {
      const order = { pending: 1, accepted: 2, rejected: 3 };
      sorted.sort((a, b) => order[a.status] - order[b.status]);
    }

    setSortType(type);
    setInterests(sorted);
  };

  const updateStatus = async (interest, newStatus) => {
    try {
      await fetch("https://krishi-link-server-eight.vercel.app/interests/update-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interestId: interest._id,
          cropsId: interest.cropId,
          status: newStatus,
        }),
      });

      if (newStatus === "accepted") {
        await fetch(
          `https://krishi-link-server-eight.vercel.app/crops/update-quantity/${interest.cropId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reduceBy: Number(interest.requestedQuantity),
            }),
          }
        );
      }
      setInterests((prev) =>
        prev.map((item) =>
          item._id === interest._id ? { ...item, status: newStatus } : item
        )
      );

      toast.success(`Interest ${newStatus}!`);
    } catch (err) {
      toast.error("Action failed!");
    }
  };

  /* ---------------- UI ---------------- */

  if (loading)
    return (
      <div className="text-center text-lg py-10 text-gray-900">
        Loading your interests...
      </div>
    );

  if (!loading && interests.length === 0)
    return (
      <div className="text-center py-10 text-gray-800 text-xl">
        You have no interests.
      </div>
    );

  return (
    <div className="p-10 text-gray-900">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">My Interests</h1>

        <button
          onClick={() =>
            sortInterests(sortType === "latest" ? "status" : "latest")
          }
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <ArrowUpDown size={18} />
          Sort: {sortType === "latest" ? "Latest" : "Status"}
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-800 text-lg">
            <tr>
              <th className="px-6 py-4">Crop</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Requested Qty</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="text-lg text-gray-900">
            {interests.map((interest) => (
              <tr key={interest._id} className="border-t">

                <td className="px-6 py-4 flex items-center gap-3 font-semibold">
                  <img
                    src={
                      interest.cropImage?.startsWith("http")
                        ? interest.cropImage
                        : `https://krishi-link-server-eight.vercel.app/uploads/${interest.cropImage}`
                    }
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  {interest.cropName}
                </td>

                <td className="px-6 py-4">{interest.ownerEmail}</td>

                <td className="px-6 py-4">{interest.requestedQuantity}</td>

                <td className="px-6 py-4">{interest.message}</td>


                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">

                    <span
                      className={`px-4 py-1 rounded-full text-white font-semibold
                        ${
                          interest.status === "pending"
                            ? "bg-yellow-500"
                            : interest.status === "accepted"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }
                      `}
                    >
                      {interest.status}
                    </span>

                    {interest.status === "pending" && (
                      <div className="flex gap-2">

                        <button
                          onClick={() => updateStatus(interest, "accepted")}
                          className="text-green-600 hover:text-green-800"
                          title="Accept"
                        >
                          <CheckCircle size={24} />
                        </button>

                        <button
                          onClick={() => updateStatus(interest, "rejected")}
                          className="text-red-600 hover:text-red-800"
                          title="Reject"
                        >
                          <XCircle size={24} />
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
