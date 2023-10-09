import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });

      console.log(response.data); // Handle the successful signup response

      toast.success("Registration successful", {
        duration: 3000, // Toast will be shown for 3 seconds
        position: "top-center",
      });
      // Redirect to the main page on successful signup
      setTimeout(() => {
        navigate("/main");
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error.response.data.error); // Handle the error response, e.g., display an error message
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Signup</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="email" className="block mb-2">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </label>
        <label htmlFor="password" className="block mb-2">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </label>
        <div className=" space-x-6">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Signup
          </button>
          <button
            onClick={() => navigate("/login")}
            type="submit"
            className="bg-orange-500 text-white p-2 rounded mt-4"
          >
            Login
          </button>
        </div>
      </form>

      <Toaster position="top-center" />
    </div>
  );
};

export default Signup;