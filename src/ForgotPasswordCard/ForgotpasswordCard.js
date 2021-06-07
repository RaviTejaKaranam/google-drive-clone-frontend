import React, { useState } from "react";
// import "./SignUpCard.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const ForgotPasswordCard = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    buttonText: "Get password reset link",
  });

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setUserDetails((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserDetails((prevState) => ({
      ...prevState,
      buttonText: "Submitting...",
    }));
    try {

      console.log("Send Request")
      let res = await axios.put(`${process.env.REACT_APP_API}/forgot-password`, {
        email: userDetails.email,
      });
      let data = res.data;
      setUserDetails((prevState) => ({
        ...prevState,
        email: "",
        buttonText: "Get password reset link",
      }));
      toast.success(data.message);
    } catch (error) {
      console.log("Error", error.response.data.error);
      setUserDetails((prevState) => ({
        ...prevState,
        buttonText: "Get password reset link",
      }));
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form className="form">
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
        </div>
        <button
          className="btn-primary btn-block p-2"
          name="signup"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          {userDetails.buttonText}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordCard;
