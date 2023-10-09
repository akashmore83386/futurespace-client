import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log(response.data); // Handle the successful login response

      toast.success('Login successful', {
        duration: 3000,
        position: 'top-center',
      })

      // Redirect to the main page on successful login
      setTimeout(() => {
        navigate("/main");
      }, 3000)
    } catch (error) {
      toast.error(error.response.data.error);

      console.error(error.response.data.error); // Handle the error response, e.g., display an error message
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
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
            className="bg-orange-500 text-white p-2 rounded mt-4"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/")}
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Create Account
          </button>

          <button
            onClick={() => navigate("/password-change")}
            type="submit"
            className="bg-black text-white p-2 rounded mt-4"
          >
            Change Password
          </button>
        </div>
      </form>

      <Toaster position="top-center" />
    </div>
  );
};

export default Login;
