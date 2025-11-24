import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogIn = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        signInUser(email, password)
        .then(result =>{
            console.log(result.user);
            event.target.reset();
            navigate("/"); // login success -> home page
        })
        .catch(error =>{
            console.log(error);
        })
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2 text-green-500">Login to Your Account</h2>
        <p className="text-center text-gray-500 mb-6">Please enter your details to continue.</p>

        <form onSubmit={handleLogIn}>
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-green-400 text-gray-800"
          />

          <label className="text-gray-700 font-medium">Password</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-3 mt-2 mb-4 focus:outline-none focus:border-green-400 text-gray-800"
            />
          </div>

          <button className="text-sm text-green-600 hover:underline mb-4">Forgot Password?</button>

          <button className="w-full mt-2 bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition">
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">Or continue with</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 text-black">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5"
          />
          Sign up with Google
        </button>
      </div>
    </div>
  );
}
