import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User, MapPin, MessageSquare, Package, BadgeDollarSign, FileText } from "lucide-react";
import toast from "react-hot-toast";

export default function CropDetails() {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interests, setInterests] = useState([]);
  const [interestForm, setInterestForm] = useState({
    quantity: "",
    message: "",
  });

  const loggedUserEmail = "testbuyer@gmail.com"; // TODO: Auth এ dynamic হবে

  /* ================================
      LOAD CROP DETAILS
  ================================= */
  useEffect(() => {
    fetch(`http://localhost:3000/allcrops/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCrop(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  /* ================================
      LOAD RECEIVED INTERESTS (Seller)
  ================================= */
  useEffect(() => {
    if (crop?.userEmail) {
      fetch(`http://localhost:3000/interest/${crop.userEmail}`)
        .then((res) => res.json())
        .then((data) => setInterests(data));
    }
  }, [crop]);

  /* ================================
      SUBMIT INTEREST
  ================================= */
  const handleInterestSubmit = (e) => {
    e.preventDefault();

    const interestData = {
      cropId: id,
      sellerEmail: crop.userEmail,
      buyerEmail: loggedUserEmail,
      message: interestForm.message,
      quantity: interestForm.quantity,
      status: "pending",
    };

    fetch("http://localhost:3000/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(interestData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Interest sent successfully!");
        setInterestForm({ quantity: "", message: "" });
      })
      .catch(() => toast.error("Failed to send interest"));
  };

  /* ================================
      UPDATE INTEREST STATUS
  ================================= */
  const updateStatus = (interestId, status) => {
    fetch(`http://localhost:3000/updateInterestStatus/${interestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(`Marked as ${status}`);
        setInterests((prev) =>
          prev.map((i) => (i._id === interestId ? { ...i, status } : i))
        );
      });
  };

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (!crop) return <p className="text-center mt-20">Crop not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-black">

      {/* ---------- IMAGE & INFO SECTION ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Image */}
<img
  src={`http://localhost:3000/uploads/${crop.image}`}
  alt={crop.name}
  className="w-full h-[420px] object-cover hover:scale-105 transition"
/>



        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-wide">
            {crop.name}
          </h1>

          <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full">
            {crop.type}
          </span>

          <div className="flex items-center gap-3 text-xl font-semibold">
            <BadgeDollarSign className="text-green-600" />
            <span>
              {crop.pricePerUnit} Tk / {crop.unit}
            </span>
          </div>

          <div className="flex items-center gap-3 text-lg font-medium">
            <Package className="text-indigo-600" />
            <span>
              Available: <span className="text-green-600 font-bold">{crop.quantity}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-lg">
            <MapPin className="text-red-600" />
            <span className="font-semibold">{crop.location}</span>
          </div>

<div className="mt-4">
  <p className="text-green-500 text-lg font-bold">Description:</p>
  <p className="text-gray-700 text-base font-medium mt-1 leading-relaxed">
    {crop.description}
  </p>
</div>


          {/* Seller Info */}
          <div className="p-5 bg-gray-100 rounded-xl flex items-center gap-5 shadow-md">
            <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white">
              <User size={30} />
            </div>

            <div>
              <h3 className="text-xl font-bold">{crop.userName}</h3>
              <p className="text-gray-600">{crop.userEmail}</p>
            </div>
          </div>
        </div>

      </div>

      {/* ---------- INTEREST FORM ---------- */}
      <div className="mt-14 bg-white shadow-xl p-7 rounded-xl ">
        <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
          <MessageSquare className="text-green-600" /> Express Your Interest
        </h2>

        <form onSubmit={handleInterestSubmit} className="space-y-5">

          <input
            type="number"
            placeholder="Enter desired quantity"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            value={interestForm.quantity}
            onChange={(e) =>
              setInterestForm({ ...interestForm, quantity: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Write a message to the seller"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            rows="4"
            value={interestForm.message}
            onChange={(e) =>
              setInterestForm({ ...interestForm, message: e.target.value })
            }
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition"
          >
            Send Interest
          </button>
        </form>
      </div>

      {/* ---------- RECEIVED INTERESTS (Seller Only) ---------- */}
      {loggedUserEmail === crop.userEmail && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-5">Received Interests</h2>

          <div className="overflow-x-auto shadow-lg rounded-xl border">
            <table className="w-full">
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="p-4">Buyer Email</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {interests.map((i) => (
                  <tr key={i._id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{i.buyerEmail}</td>
                    <td className="p-4">{i.quantity}</td>
                    <td className="p-4">{i.message}</td>
                    <td className="p-4 font-semibold capitalize">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          i.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : i.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {i.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-3">
                      <button
                        className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                        onClick={() => updateStatus(i._id, "accepted")}
                      >
                        Accept
                      </button>

                      <button
                        className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                        onClick={() => updateStatus(i._id, "rejected")}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
}
