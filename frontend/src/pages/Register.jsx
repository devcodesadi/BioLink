import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../slice/userApiSlice";
import { setCredentials } from "../slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import LayingDoodle from "../assets/LayingDoodle.svg"

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return setError("All fields are mandatory");
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate('/user/email-sent')
      setError("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white text-[#0A0A0A] px-6">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* Left Section: Form */}
        <div className="text-center md:text-left md:w-1/2">
          <h2 className="text-4xl font-bold mb-6">
            Create Your Account and{" "}
            <span className="text-[#10B981]">Join Us Today!</span>
          </h2>
          <p className="text-lg mb-6 text-gray-600">
            Sign up now and get access to all the benefits our platform offers.
            Unlock personalized content, exclusive updates, and much more!
          </p>

          {/* Error Message */}
          {error && (
            <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </p>
          )}

          {/* Form */}
          <form action="" className="space-y-6" onSubmit={handleOnSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-3 rounded-lg bg-white text-[#0A0A0A] placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981]"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3 rounded-lg bg-white text-[#0A0A0A] placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981]"
            />
            <input
              type="password"
              name="password"
              placeholder="Create a Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3 rounded-lg bg-white text-[#0A0A0A] placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981]"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#10B981] text-white font-semibold rounded-lg cursor-pointer shadow-md hover:bg-[#059669] transition"
            >
              {isLoading ? <Loading /> : "Join Now"}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
  Already have an account?{" "}
  <Link
    to="/user/login"
    className="text-[#10B981] font-semibold hover:underline transition"
  >
    Log in
  </Link>
</p>

        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={LayingDoodle}
            alt="LayingDoodle"
            className="w-full max-w-md object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
