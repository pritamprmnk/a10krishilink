import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddCrops() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "Vegetable",
    pricePerUnit: "",
    unit: "kg",
    quantity: "",
    description: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const res = await fetch("/api/crops", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        toast.success("Crop added successfully!");
        navigate("/my-posts");
      } else {
        toast.error("Error adding post");
      }
    } catch (err) {
      toast.error("Request failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Create a New Crop Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block font-semibold text-gray-900">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-green-400 text-gray-800"
              placeholder="e.g., Heirloom Tomatoes"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block font-semibold text-gray-900">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-green-400 text-gray-800 font-medium"
            >
              <option>Vegetable</option>
              <option>Fruit</option>
              <option>Grain</option>
              <option>Other</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold text-gray-900">Price per unit</label>
            <input
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-green-400 text-gray-800 font-medium"
              placeholder="e.g., 55"
              required
            />
          </div>

          {/* Unit */}
          <div>
            <label className="block font-semibold text-gray-900">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-green-400 text-gray-800 font-medium"
            >
              <option>kg</option>
              <option>ton</option>
              <option>bag</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-semibold text-gray-900">Estimated Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-green-400 text-gray-800 font-medium"
              placeholder="e.g., 1000"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold text-gray-900">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:border-green-400 text-gray-800 font-medium"
              placeholder="e.g., Bogura"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-900">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 h-24 rounded focus:outline-none focus:border-green-400 text-gray-800"
            placeholder="Write crop details..."
            required
          ></textarea>
        </div>

        {/* Image */}
        <div>
          <label className="block font-semibold text-gray-900">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:border-green-400 text-gray-800 font-medium"
            required
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-400 rounded text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}