import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../slice/userApiSlice";
import { setCredentials } from "../slice/authSlice";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import groovyDoodle from "../assets/GroovySittingDoodle.svg"

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError("All fields are mandatory");
    }
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      setError("");
      window.location.href = "/user/dashboard";
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
            Welcome Back! <span className="text-[#10B981]">Log In</span>
          </h2>
          <p className="text-lg mb-6 text-gray-600">
            Access your account and continue enjoying your personalized
            experience with us.
          </p>

          {/* Error Message */}
          {error && (
            <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error.data.message}
            </p>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleOnSubmit}>
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
              placeholder="Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3 rounded-lg bg-white text-[#0A0A0A] placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981]"
            />
            <button
              disabled={isLoading}
              type="submit"
              className="w-full px-6 py-3 bg-[#10B981] text-white font-semibold cursor-pointer rounded-lg shadow-md hover:bg-[#059669] transition"
            >
              LogIn
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
  <Link
    to="/user/register"
    className="text-[#10B981] font-semibold hover:underline transition"
  >
  
    Sign up
  </Link>
</p>

        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={groovyDoodle}
            alt="groovyDoodle"
            className="w-full max-w-md object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
