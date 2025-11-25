import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init"; 
export default function Profile() {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if(auth.currentUser){
      updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL })
        .then(() => {
          alert("Profile updated successfully!");
          setIsEditing(false);
        })
        .catch((err) => {
          console.error("Error updating profile:", err);
          alert("Failed to update profile");
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Profile</h1>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b pb-6 gap-4 md:gap-0">
          <div className="flex gap-6 items-center">
            <img
              src={user?.photoURL || "/assets/avatar.png"}
              alt="Profile"
              className="w-28 h-28 rounded-full border object-cover"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user?.displayName || "User Name"}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            {isEditing ? "Cancel" : "Update Profile"}
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-teal-400 text-gray-800"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-teal-500 text-gray-800"
              />
            </div>

            <button
              type="submit"
              className="bg-teal-500 text-white px-5 py-3 rounded-lg font-medium hover:bg-teal-600"
            >
              Save Changes
            </button>
          </form>
        )}

        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <div className="flex items-center mt-2 bg-gray-100 p-4 rounded-lg">
              <span className="mr-3 text-gray-500">👤</span>
              <span className="text-gray-700 font-medium">{user?.displayName}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email Address</label>
            <div className="flex items-center mt-2 bg-gray-100 p-4 rounded-lg">
              <span className="mr-3 text-gray-500">📧</span>
              <span className="text-gray-700 font-medium">{user?.email}</span>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
