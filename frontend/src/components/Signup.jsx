import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utiles";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const signupInputHandle = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };

    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "http://localhost:8000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();

      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (message === "User already exists, you can login") {
        handleError("User already exists, you can login");
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(error);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container">
      <form action="" onSubmit={submitDetails}>
        <h1>Signup</h1>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name"
            value={signupInfo.name}
            onChange={signupInputHandle}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={signupInfo.email}
            onChange={signupInputHandle}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={signupInfo.password}
            onChange={signupInputHandle}
          />
        </div>
        <button>Signup</button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
