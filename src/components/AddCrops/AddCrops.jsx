import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

export default function AddCrops() {
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const userEmail = user?.email || "";
  const userName = user?.displayName || "";

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

    if (files && files.length > 0) {
      const file = files[0];

      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPG or PNG images are allowed!");
        return;
      }

      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      toast.error("Please login first!");
      return;
    }

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("userEmail", userEmail);
    data.append("userName", userName);

    try {
      const res = await fetch("http://localhost:3000/allcrops", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Crop added successfully!");
        setTimeout(() => navigate("/myposts"), 1000);
      } else {
        toast.error(result.message || "Failed to add crop");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-8 text-black">
      <h2 className="text-3xl font-bold mb-6 text-green-500">Create a New Crop Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="font-semibold">Crop Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter crop name"
              className="w-full border rounded-lg px-4 py-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Crop Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 mt-2"
            >
              <option>Vegetable</option>
              <option>Fruit</option>
              <option>Grain</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Price Per Unit</label>
            <input
              type="number"
              name="pricePerUnit"
              onChange={handleChange}
              placeholder="Price"
              className="w-full border rounded-lg px-4 py-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 mt-2"
            >
              <option>kg</option>
              <option>ton</option>
              <option>bag</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Quantity</label>
            <input
              type="number"
              name="quantity"
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full border rounded-lg px-4 py-3 mt-2"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Location</label>
            <input
              type="text"
              name="location"
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border rounded-lg px-4 py-3 mt-2"
              required
            />
          </div>

        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Write crop details..."
            className="w-full border rounded-lg px-4 py-3 mt-2"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Upload Image</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 mt-2"
            required
          />
        </div>

        <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white text-lg rounded-lg">
          Create Post
        </button>
      </form>
    </div>
  );
}
