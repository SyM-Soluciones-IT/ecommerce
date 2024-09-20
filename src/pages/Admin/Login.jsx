import { message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://peniamatias.alwaysdata.net/api/portfolio/admin-login",
        user
      );
      dispatch(HideLoading());
  
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "/admin";
      } else {
        message.error(response.data.message); // Display the error message from the server
      }
    } catch (error) {
      // Check if the error response exists and contains the message from the server
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("An unexpected error occurred. Please try again."); // Fallback error message
      }
      dispatch(HideLoading());
    }
  };
  

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-96 flex flex-col gap-5 p-5 shadow border border-gray-500 bg-white">
        <h1 className="text-2xl">Portfolio - Admin Login</h1>
        <hr />
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          onKeyDown={handleKeyDown}
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="bg-primary text-white px-5 py-2" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
