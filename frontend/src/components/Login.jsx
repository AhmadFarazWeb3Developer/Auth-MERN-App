import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";

const Login = () => {
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginInputHandle = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;

    setloginInfo(copyloginInfo);
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "http://localhost:8000/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      console.log(result);
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <form action="" onSubmit={submitDetails}>
        <h1>Login</h1>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginInfo.email}
            onChange={loginInputHandle}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginInfo.password}
            onChange={loginInputHandle}
          />
        </div>
        <button>Login</button>
        <span>
          Don't have an account ? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
