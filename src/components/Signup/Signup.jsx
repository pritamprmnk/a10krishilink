import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignup = (event) =>{
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        createUser(email,password)
        .then(result =>{
            console.log(result.user);
            event.target.reset();
            navigate("/"); // signup success -> home page
        })
        .catch(error =>{
            console.log(error);
        })
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2 text-green-500">Create Your Account</h2>
        <p className="text-center text-gray-500 mb-6">Join our community of farmers and buyers.</p>

        <form onSubmit={handleSignup}>
          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Full Name</span>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-green-400 text-gray-800"
            />
          </label>

          <label className="block mb-3">
            <span className="text-gray-700 font-medium">Email Address</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-green-400 text-gray-800"
            />
          </label>

          <div className="mb-4">
            <span className="text-gray-700 font-medium">Password</span>
            <div className="relative mt-1">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-green-400 text-gray-800"
              />
            </div>
          </div>

          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
            Sign Up
          </button>
        </form>

        <div className="my-3 text-center text-gray-400">OR</div>

        <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 text-black">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5"
          />
          Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
