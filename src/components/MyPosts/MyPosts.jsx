import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";

export default function MyPosts({ userEmail }) {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  useEffect(() => {
    if (!userEmail) return;

    fetch(`http://localhost:3000/mycrops/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userEmail]);

  const handleEditClick = (crop) => {
    setSelectedCrop({ ...crop });
    setEditModalOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name: selectedCrop.name,
      type: selectedCrop.type,
      pricePerUnit: selectedCrop.pricePerUnit,
      unit: selectedCrop.unit,
      quantity: selectedCrop.quantity,
      description: selectedCrop.description,
      location: selectedCrop.location,
      userEmail,
    };

    fetch(`http://localhost:3000/allcrops/${selectedCrop._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Post updated!");

        setCrops((prev) =>
          prev.map((item) =>
            item._id === selectedCrop._id ? { ...item, ...updatedData } : item
          )
        );

        setEditModalOpen(false);
      })
      .catch(() => toast.error("Update failed!"));
  };

  const handleDeleteClick = (crop) => {
    setSelectedCrop(crop);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    fetch(
      `http://localhost:3000/allcrops/${selectedCrop._id}?email=${userEmail}`,
      { method: "DELETE" }
    )
      .then(() => {
        setCrops((prev) => prev.filter((c) => c._id !== selectedCrop._id));
        toast.success("Post deleted!");
        setDeleteModalOpen(false);
      })
      .catch(() => toast.error("Delete failed!"));
  };

  // ---------------- UI ----------------

  if (loading)
    return (
      <div className="text-center text-lg py-10 text-gray-600 animate-pulse">
        Loading your posts...
      </div>
    );

  if (!loading && crops.length === 0)
    return (
      <div className="text-center py-10 text-gray-700 text-xl italic">
        You have no crop posts yet.
      </div>
    );

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-green-500 tracking-wide">
        🌾 My Crop Posts
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-4 px-3 text-left text-gray-700 font-semibold">Image</th>
                <th className="py-4 px-3 text-left text-gray-700 font-semibold">Name</th>
                <th className="py-4 px-3 text-left text-gray-700 font-semibold">Type</th>
                <th className="py-4 px-3 text-left text-gray-700 font-semibold">Price</th>
                <th className="py-4 px-3 text-left text-gray-700 font-semibold">Quantity</th>
                <th className="py-4 px-3 text-left text-gray-700 font-semibold">Location</th>
                <th className="py-4 px-3 text-right text-gray-700 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {crops.map((crop) => (
                <tr
                  key={crop._id}
                  className="border-b hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="py-3 px-3">
                    <img
                      src={
                        crop.image?.startsWith("http")
                          ? crop.image
                          : `http://localhost:3000/uploads/${crop.image}`
                      }
                      alt={crop.name}
                      className="w-16 h-16 rounded-xl object-cover shadow-sm"
                    />
                  </td>

                  <td className="py-4 px-3 font-medium text-gray-900">{crop.name}</td>
                  <td className="py-4 px-3 text-gray-700">{crop.type}</td>
                  <td className="py-4 px-3 text-gray-700">
                    {crop.pricePerUnit} / {crop.unit}
                  </td>
                  <td className="py-4 px-3 text-gray-700">{crop.quantity}</td>
                  <td className="py-4 px-3 text-gray-700">{crop.location}</td>

                  <td className="py-4 px-3 text-right space-x-4">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition"
                      onClick={() => handleEditClick(crop)}
                    >
                      <Pencil size={20} />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => handleDeleteClick(crop)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* ---------------- Edit Modal ---------------- */}
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 text-black"
      >
        <form
          onSubmit={handleEditSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-[420px]"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            ✏️ Edit Crop
          </h2>

          <div className="space-y-3">
            {["name", "type", "location"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                className="w-full border p-3 rounded-lg"
                value={selectedCrop?.[field]}
                onChange={(e) =>
                  setSelectedCrop({
                    ...selectedCrop,
                    [field]: e.target.value,
                  })
                }
              />
            ))}

            <input
              type="number"
              placeholder="Price Per Unit"
              className="w-full border p-3 rounded-lg"
              value={selectedCrop?.pricePerUnit}
              onChange={(e) =>
                setSelectedCrop({
                  ...selectedCrop,
                  pricePerUnit: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Quantity"
              className="w-full border p-3 rounded-lg"
              value={selectedCrop?.quantity}
              onChange={(e) =>
                setSelectedCrop({
                  ...selectedCrop,
                  quantity: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              className="w-full bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Update
            </button>
          </div>
        </form>
      </Dialog>

      {/* ---------------- Delete Modal ---------------- */}
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            ❗ Delete Post?
          </h2>

          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this crop?
          </p>

          <div className="flex justify-between gap-4">
            <button
              className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
