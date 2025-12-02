import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  User,
  MapPin,
  MessageSquare,
  Package,
  BadgeDollarSign,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";

const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:3000";

export default function CropDetails() {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interests, setInterests] = useState([]);

  const [interestForm, setInterestForm] = useState({
    quantity: "",
    message: "",
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [alreadySent, setAlreadySent] = useState(false);
  const [sendingInterest, setSendingInterest] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const getAuthFromStorage = () => {
    try {
      const raw = localStorage.getItem("user") || localStorage.getItem("authUser");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const auth = getAuthFromStorage();
  const loggedUserEmail = auth?.email || auth?.user?.email || "testbuyer@gmail.com";
  const loggedUserName =
    auth?.name || auth?.displayName || auth?.user?.displayName || "Test Buyer";
  const token = auth?.token || auth?.accessToken || null;

  const makeJsonHeaders = () => {
    const h = { "Content-Type": "application/json" };
    if (token) h.Authorization = `Bearer ${token}`;
    return h;
  };

// ---- FIXED OWNER CHECK ----
const ownerEmail =
  crop?.userEmail || crop?.ownerEmail || crop?.owner?.ownerEmail || null;

const isOwner =
  Boolean(ownerEmail) &&
  Boolean(loggedUserEmail) &&
  loggedUserEmail.toLowerCase() === ownerEmail.toLowerCase();


  useEffect(() => {
    let aborted = false;
    setLoading(true);

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/allcrops/${id}`);
        if (!res.ok) {
          if (!aborted) {
            setCrop(null);
            setInterests([]);
            setAlreadySent(false);
            toast.error("Failed to load crop details.");
          }
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (aborted) return;
        setCrop(data || null);

        if (Array.isArray(data?.interests)) {
          setInterests(data.interests);
          const sent = data.interests.some(
            (it) =>
              (it.userEmail && it.userEmail === loggedUserEmail) ||
              (it.buyerEmail && it.buyerEmail === loggedUserEmail) ||
              (it.email && it.email === loggedUserEmail)
          );
          setAlreadySent(Boolean(sent));
        } else {
          setInterests([]);
          setAlreadySent(false);
        }
      } catch (err) {
        if (!aborted) {
          console.error("Load crop error:", err);
          toast.error("Unable to load crop. Check your connection.");
        }
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => {
      aborted = true;
    };
  }, [id, loggedUserEmail]);

  useEffect(() => {
    let aborted = false;
    if (isOwner && ownerEmail) {
      (async () => {
        try {
          const res = await fetch(`${API_BASE}/interest/${encodeURIComponent(ownerEmail)}`, {
            headers: makeJsonHeaders(),
          });
          if (!res.ok) {
            return;
          }
          const data = await res.json();
          if (aborted) return;
          if (Array.isArray(data)) setInterests(data);
        } catch (err) {
          console.error("Failed to fetch owner interests:", err);
        }
      })();
    }
    return () => {
      aborted = true;
    };
  }, [isOwner, ownerEmail]);

  const parsedQuantity = Number(interestForm.quantity) || 0;
  const totalPrice =
    crop && parsedQuantity > 0 ? parsedQuantity * Number(crop.pricePerUnit) : 0;

  const getImageUrl = (img) => {
    if (!img) return "";
    if (typeof img !== "string") return "";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;

    return `${API_BASE}/uploads/${img}`;
  };

  const handleInterestSubmit = (e) => {
    e.preventDefault();

    if (!interestForm.quantity || Number(interestForm.quantity) < 1) {
      return toast.error("Quantity must be at least 1");
    }
    if (crop && Number(interestForm.quantity) > Number(crop.quantity)) {
      return toast.error(
        `Requested quantity exceeds available (${crop.quantity} ${crop.unit}).`
      );
    }
    if (isOwner) {
      return toast.error("Owners cannot send interest on their own crop.");
    }

    if (alreadySent) {
      return toast.error("You've already sent an interest for this crop.");
    }

    setShowConfirm(true);
  };

  const confirmAndSendInterest = async () => {
    setSendingInterest(true);

    const interestData = {
      cropId: id,
      userEmail: loggedUserEmail,
      userName: loggedUserName,
      quantity: Number(interestForm.quantity),
      message: interestForm.message,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${API_BASE}/interest`, {
        method: "POST",
        headers: makeJsonHeaders(),
        body: JSON.stringify(interestData),
      });

      if (res.status === 409) {
        const errBody = await res.json().catch(() => ({}));
        toast.error(errBody.message || "You have already sent an interest for this crop.");
        setSendingInterest(false);
        setShowConfirm(false);
        return;
      }

      if (!res.ok) {
        const err = await res.text().catch(() => "Failed to send interest");
        throw new Error(err || "Failed to send interest");
      }

      const created = await res.json();

      // Update UI
      toast.success("Interest sent successfully!");
      setInterestForm({ quantity: "", message: "" });
      setAlreadySent(true);
      setShowConfirm(false);

      const newInterest =
        created && created._id
          ? created
          : {
              _id: Date.now().toString(),
              ...interestData,
            };

      setInterests((prev) => [newInterest, ...(prev || [])]);

      setCrop((prev) =>
        prev
          ? { ...prev, interests: prev.interests ? [newInterest, ...prev.interests] : [newInterest] }
          : prev
      );
    } catch (err) {
      console.error("Send interest error:", err);
      toast.error("Failed to send interest. Try again.");
    } finally {
      setSendingInterest(false);
    }
  };

  const updateStatus = async (interestId, status) => {
    if (!interestId) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE}/interests/${encodeURIComponent(interestId)}`, {
        method: "PATCH",
        headers: makeJsonHeaders(),
        body: JSON.stringify({ cropsId: crop?._id || id, status }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || "Failed to update status");
      }

      const body = await res.json().catch(() => null);

      const updatedInterest =
        body && (body.updatedInterest || body.interest) ? (body.updatedInterest || body.interest) : null;

      setInterests((prev) =>
        prev.map((i) => (i._id === interestId ? { ...(updatedInterest || i), status } : i))
      );

      if (status === "accepted") {
        let qtyToReduce = 0;
        if (updatedInterest && updatedInterest.quantity) {
          qtyToReduce = Number(updatedInterest.quantity);
        } else {
          const found = interests.find((it) => it._id === interestId);
          qtyToReduce = found ? Number(found.quantity || 0) : 0;
        }

        if (qtyToReduce > 0) {
          setCrop((prev) =>
            prev ? { ...prev, quantity: Math.max(0, Number(prev.quantity) - qtyToReduce) } : prev
          );
        }

        toast.success("Interest accepted. Quantity updated.");
      } else {
        toast.success(`Interest marked ${status}`);
      }
    } catch (err) {
      console.error("Update status error:", err);
      toast.error("Failed to update interest status.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  if (!crop) return <p className="text-center mt-20">Crop not found</p>;

  const viewerAlreadySent =
    alreadySent ||
    Boolean(
      crop?.interests?.some((it) => it.userEmail === loggedUserEmail) ||
        interests?.some((it) => it.userEmail === loggedUserEmail) ||
        interests?.some((it) => it.buyerEmail === loggedUserEmail)
    );

    console.log("LS user: ", localStorage.getItem("user"));
console.log("LS authUser: ", localStorage.getItem("authUser"));


  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-black">



      {/* ---------- IMAGE & INFO SECTION ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <img
          src={getImageUrl(crop.image)}
          alt={crop.name}
          className="w-full h-[420px] object-cover hover:scale-105 transition"
        />

        {/* Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-wide">{crop.name}</h1>

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
              Available:{" "}
              <span className="text-green-600 font-bold">{crop.quantity}</span>
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
              <h3 className="text-xl font-bold">{crop.userName || crop.owner?.ownerName}</h3>
              <p className="text-gray-600">{crop.userEmail || crop.owner?.ownerEmail}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- INTEREST FORM (only for non-owner) ---------- */}
      {crop && !isOwner && (
        <div className="mt-14 bg-white shadow-xl p-7 rounded-xl ">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <MessageSquare className="text-green-600" /> Express Your Interest
          </h2>

          {viewerAlreadySent ? (
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="font-semibold">You've already sent an interest for this crop.</p>
            </div>
          ) : (
            <form onSubmit={handleInterestSubmit} className="space-y-5">
              <input
                type="number"
                min="1"
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

              {/* Total Price display (auto-calculated) */}
              <div className="flex items-center justify-between border p-3 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="text-lg font-semibold">
                    {totalPrice ? `${totalPrice} Tk` : "—"}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Price per unit: {crop.pricePerUnit} Tk</p>
                  <p>Unit: {crop.unit}</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={sendingInterest}
                className={`w-full ${
                  sendingInterest ? "opacity-70 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                } text-white py-3 rounded-lg text-lg font-semibold transition`}
              >
                {sendingInterest ? "Sending..." : "Send Interest"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* ---------- Confirmation Modal (simple) ---------- */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              if (!sendingInterest) setShowConfirm(false);
            }}
          />
          <div className="bg-white rounded-lg p-6 z-50 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-3">Confirm Interest</h3>
            <p className="mb-4">
              You're about to send an interest for{" "}
              <span className="font-semibold">{interestForm.quantity || 0} {crop.unit}</span>{" "}
              (Total: <span className="font-semibold">{totalPrice} Tk</span>) to{" "}
              <span className="font-semibold">{crop.userName || crop.owner?.ownerName}</span>.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 rounded-md border"
                onClick={() => setShowConfirm(false)}
                disabled={sendingInterest}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md"
                onClick={confirmAndSendInterest}
                disabled={sendingInterest}
              >
                {sendingInterest ? "Sending..." : "Confirm & Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- RECEIVED INTERESTS (Owner Only) ---------- */}
      {isOwner && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-5">Received Interests</h2>

          {(!interests || interests.length === 0) ? (
            <div className="p-6 bg-gray-50 rounded-lg text-gray-600">
              No interests yet for this crop.
            </div>
          ) : (
            <div className="overflow-x-auto shadow-lg rounded-xl border">
              <table className="w-full">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-4">Buyer Name</th>
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
                      <td className="p-4 font-medium">
                        {i.userName || i.buyerName || i.buyer || "—"}
                      </td>
                      <td className="p-4">{i.userEmail || i.buyerEmail || i.email}</td>
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
                        {/* Show actions only when pending */}
                        {i.status === "pending" ? (
                          <>
                            <button
                              className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                              onClick={() => updateStatus(i._id, "accepted")}
                              disabled={actionLoading}
                            >
                              {actionLoading ? "..." : "Accept"}
                            </button>

                            <button
                              className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                              onClick={() => updateStatus(i._id, "rejected")}
                              disabled={actionLoading}
                            >
                              {actionLoading ? "..." : "Reject"}
                            </button>
                          </>
                        ) : (
                          <div className="text-sm text-gray-500">No actions</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
