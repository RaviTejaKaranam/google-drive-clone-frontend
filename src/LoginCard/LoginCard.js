import React, { useEffect, useState } from "react";
import profilepic from "../images/profile-pic.jpg";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./LoginCard.css";
import { authenticate, isAuthenticated } from "../Helpers/helpers";
import HomePage from '../HomePage/HomePage';
const LoginCard = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    buttonText: "Login",
  });

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    console.log(fieldName);
    setUserDetails((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserDetails((prevState) => ({
      ...prevState,
      buttonText: "Here we go...",
    }));
    try {
      let res = await axios.post(`${process.env.REACT_APP_API}/login`, {
        email: userDetails.email,
        password: userDetails.password,
      });
      // let data = res.data
      authenticate(res, () => {
        setUserDetails((prevState) => ({
          ...prevState,
          email: "",
          password: "",
          buttonText: "Login",
        }));
        toast.success(`Hey, ${res.data.user.name} Welcome!`);
      });
    } catch (error) {
      console.log("Login error", error.response.data.error);
      setUserDetails((prevState) => ({
        ...prevState,
        buttonText: "Login",
      }));
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <ToastContainer />
      {isAuthenticated() ? <Redirect to = "/homepage" /> : null}
      <form className="form">
        <div className="display-image">
          <img src={profilepic} alt="Profile pic" />
        </div>
        <div className="user-details">
          <small className="text-primary">Email</small>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={(e) => {
              handleInput(e);
            }}
          />
          <small className="text-primary">Password</small>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={(e) => {
              handleInput(e);
            }}
          />
        </div>
        <button
          className="btn-primary btn-block p-2"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {userDetails.buttonText}
        </button>
        <div>
          <small>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </small>
        </div>
        <div>
          <small>
            <Link to="/forgot-password">Forgot Password ?</Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
