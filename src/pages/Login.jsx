import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setUserProfile } from "../store/slices/userSlice";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userLogin = () => {
    setError(null);
    axios
      .post("https://phone-server-pundir72.vercel.app/api/users/login", {
        email: userEmail,
        password: userPassword,
      })
      .then((response) => {
        const { profile, authToken } = response.data;
        sessionStorage.setItem("authToken", authToken);
        localStorage.removeItem("formData");

        dispatch(setUserProfile(profile));
        localStorage.setItem("username", JSON.stringify(profile.name));
        navigate("/selectPhone");
      })
      .catch((err) => {
        setError(err.response?.data?.error || "An error occurred.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="p-10 bg-white rounded-lg shadow-md md:w-[700px] flex flex-col items-center ">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form id="loginForm" className="flex flex-col gap-4">
          <div>
            <label htmlFor="userEmail" className="block">
              Email:
            </label>
            <input
              type="text"
              id="userEmail"
              name="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="block w-60 h-10 border rounded-lg focus:ring focus:ring-[#EC2752] focus:outline-none pl-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              className="block w-60  h-10 border rounded-lg focus:ring focus:ring-[#EC2752] focus:outline-none pl-1"
            />
          </div>
          <Link to="/">
            <button
              onClick={userLogin}
              type="button"
              className="block w-60 h-12 bg-[#EC2752] text-white rounded-lg mt-1"
            >
              Login
            </button>
          </Link>

          {/* <span>
            Create a new account.{" "}
            <Link className="cursor-pointer text-[#EC2752]" to="/register">
              Register
            </Link>{" "}
          </span> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
