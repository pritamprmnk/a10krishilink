import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";

export default function MyPosts({ userEmail }) {

  console.log("User Email:", userEmail); // <-- তুমি যেটা চাইছিলে

  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);

  /* ---------------- Load Only User Crops ---------------- */
  useEffect(() => {
    if (!userEmail) {
      console.log("User email missing, skipping fetch...");
      return;
    }

    fetch(`http://localhost:3000/mycrops/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setCrops(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error loading my crops:", err);
        setLoading(false);
      });
  }, [userEmail]);

  /* ---------------- Edit ---------------- */
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

  /* ---------------- Delete ---------------- */
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
        toast.success("Post deleted!");
        setCrops((prev) => prev.filter((c) => c._id !== selectedCrop._id));
        setDeleteModalOpen(false);
      })
      .catch(() => toast.error("Delete failed!"));
  };

  /* ---------------- UI ---------------- */

  if (loading)
    return (
      <div className="text-center text-lg py-10 text-gray-900">
        Loading your posts...
      </div>
    );

  if (!loading && crops.length === 0)
    return (
      <div className="text-center py-10 text-gray-800 text-xl">
        You have no crop posts.
      </div>
    );

  return (
    <div className="p-10 text-gray-900">
      <h1 className="text-4xl font-bold mb-8">My Crop Posts</h1>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-800 text-lg">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody className="text-lg text-gray-900">
            {crops.map((crop) => (
              <tr key={crop._id} className="border-t">
                <td className="px-6 py-3">
                  <img
                    src={
                      crop.image?.startsWith("http")
                        ? crop.image
                        : `http://localhost:3000/uploads/${crop.image}`
                    }
                    alt={crop.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-semibold">{crop.name}</td>
                <td className="px-6 py-4">{crop.type}</td>
                <td className="px-6 py-4">
                  {crop.pricePerUnit} / {crop.unit}
                </td>
                <td className="px-6 py-4">{crop.quantity}</td>
                <td className="px-6 py-4">{crop.location}</td>

                <td className="px-6 py-4 flex gap-4">
                  <button
                    className="text-blue-700 hover:text-blue-900"
                    onClick={() => handleEditClick(crop)}
                  >
                    <Pencil size={22} />
                  </button>

                  <button
                    className="text-red-700 hover:text-red-900"
                    onClick={() => handleDeleteClick(crop)}
                  >
                    <Trash2 size={22} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- Edit Modal ---------------- */}
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <form
          onSubmit={handleEditSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-[400px] text-gray-900"
        >
          <h2 className="text-2xl font-bold mb-4">Edit Crop</h2>

          <label>Name:</label>
          <input
            type="text"
            className="w-full border p-2 mb-3"
            value={selectedCrop?.name}
            onChange={(e) =>
              setSelectedCrop({ ...selectedCrop, name: e.target.value })
            }
          />

          <label>Type:</label>
          <input
            type="text"
            className="w-full border p-2 mb-3"
            value={selectedCrop?.type}
            onChange={(e) =>
              setSelectedCrop({ ...selectedCrop, type: e.target.value })
            }
          />

          <label>Price Per Unit:</label>
          <input
            type="number"
            className="w-full border p-2 mb-3"
            value={selectedCrop?.pricePerUnit}
            onChange={(e) =>
              setSelectedCrop({
                ...selectedCrop,
                pricePerUnit: e.target.value,
              })
            }
          />

          <label>Quantity:</label>
          <input
            type="number"
            className="w-full border p-2 mb-3"
            value={selectedCrop?.quantity}
            onChange={(e) =>
              setSelectedCrop({ ...selectedCrop, quantity: e.target.value })
            }
          />

          <label>Location:</label>
          <input
            type="text"
            className="w-full border p-2 mb-3"
            value={selectedCrop?.location}
            onChange={(e) =>
              setSelectedCrop({ ...selectedCrop, location: e.target.value })
            }
          />

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="w-full mt-2 bg-gray-400 text-white p-3 rounded-lg font-semibold hover:bg-gray-500 transition"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full mt-2 bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition"
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Delete Post?</h2>

          <p className="mb-6 text-gray-700">
            Are you sure you want to delete this crop?
          </p>

          <div className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded"
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
