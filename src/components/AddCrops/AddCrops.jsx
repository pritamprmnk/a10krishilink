import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import Loader from "../Loader/Loader";

export default function AddCrops() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const userEmail = user?.email || "";
  const userName = user?.displayName || "";

  const [loading, setLoading] = useState(false);

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


const API_URL = "https://krishi-link-server-eight.vercel.app";


  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("Only JPG or PNG images are allowed!");
        return;
      }

      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) {
      toast.error("Please login first!");
      return;
    }

    if (!formData.name || !formData.pricePerUnit || !formData.quantity || !formData.description || !formData.location) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      if (!formData.image) {
        toast.error("Please select an image");
        setLoading(false);
        return;
      }

      const base64Img = await fileToBase64(formData.image);

      const payload = {
        name: formData.name,
        type: formData.type,
        pricePerUnit: formData.pricePerUnit,
        unit: formData.unit,
        quantity: formData.quantity,
        description: formData.description,
        location: formData.location,
        image: base64Img,
        userEmail,
        userName,
      };

      const res = await fetch(`${API_URL}/allcrops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Crop added successfully!");
        setTimeout(() =>{
        navigate("/myposts");
        }, 1500);

      } else {
        toast.error(result.message || "Failed to add crop");
      }
    } catch (err) {
      console.error("client error:", err);
      toast.error("Server / network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-8 text-black">
        <h2 className="text-3xl font-bold mb-6 text-green-500">Create a New Crop Listing</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="font-semibold">Crop Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
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
                value={formData.pricePerUnit}
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
                value={formData.quantity}
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
                value={formData.location}
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
              value={formData.description}
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
              name="image"
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
    </div>
  );
}
