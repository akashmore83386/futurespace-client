import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/password-change",
        {
          oldPassword,
          newPassword,
          email,
        }
      );

      console.log(response.data); // Handle the successful password change response
      toast.success("Password Changed Successful, Please Login", {
        duration: 3000, // Toast will be shown for 3 seconds
        position: "top-center",
      });
      // Redirect to the main page on successful password change
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error.response.data.error); // Handle the error response, e.g., display an error message
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Password Change</h2>
      <form onSubmit={handlePasswordChange}>
        <label htmlFor="email" className="block mb-2">
          Email:
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </label>

        <label htmlFor="oldPassword" className="block mb-2">
          Old Password:
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </label>
        <label htmlFor="newPassword" className="block mb-2">
          New Password:
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4"
        >
          Change Password
        </button>
      </form>
      <Toaster position="top-center" />
    </div>
  );
};

export default PasswordChange;
