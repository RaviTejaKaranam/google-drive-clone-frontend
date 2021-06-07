import React, { useEffect, useState, Fragment } from "react";
// import "./SignUpCard.css";
import { Link } from "react-router-dom";
import logo from "../images/google-drive-logo.png";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
const ResetPasswordCard = (props) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    token: "",
    buttonText: "Reset Password",
  });

  useEffect(() => {
    let token = props.match.params.token;
    let { name } = jwt.decode(token);
    let { _id } = jwt.decode(token);
    console.log(_id);
    console.log(name);
    setUserDetails((prevState) => ({
      ...prevState,
      name: name,
      token: token,
    }));
  }, []);

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    console.log(props.match.params.token);
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

    if (userDetails.password !== userDetails.confirmPassword) {
      toast.error("Passwords do not match");
      setUserDetails((prevState) => ({
        ...prevState,
        buttonText: "Reset Password",
      }));
    } else {
      try {
        console.log("Send Request");
        let res = await axios.put(
          `${process.env.REACT_APP_API}/reset-password`,
          {
            password: userDetails.password,
            resetPasswordLink: userDetails.token,
          }
        );
        let data = res.data;
        console.log(res.data);
        setUserDetails((prevState) => ({
          ...prevState,
          password: "",
          confirmPassword: "",
          buttonText: "Reset Password",
        }));
        toast.success(data.message);
        setTimeout(()=>{
          props.history.replace("/login")
        }, 2000)
      } catch (error) {
        console.log("Error", error.response.data.error);
        setUserDetails((prevState) => ({
          ...prevState,
          buttonText: "Reset Password",
        }));
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <Fragment>
      <nav className="navbar navbar-light bg-white">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top mr-3"
            alt=""
          />
          <span className="text-muted">Google</span> Drive
        </Link>
        <form className="form-inline">
          <Link to="/login" className="mr-3">
            <button className="btn btn-primary my-2 my-sm-0 mr-3" type="button">
              Login
            </button>
          </Link>
          <Link to="/" className="mr-3">
            <button
              className="btn btn-outline-primary my-2 my-sm-0 mr-3"
              type="button"
            >
              Home
            </button>
          </Link>
        </form>
      </nav>
      <div>
        <ToastContainer />
        <form className="form">
          <small>
            Hey <span className="text-muted">{userDetails.name}</span>, please
            reset your password
          </small>
          <div className="user-details mt-1">
            <small className="text-primary">New Password</small>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={(e) => {
                handleInput(e);
              }}
            />
            <small className="text-primary">Confirm Password</small>
            <input
              type="password"
              name="confirmPassword"
              value={userDetails.confirmPassword}
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
    </Fragment>
  );
};

export default ResetPasswordCard;
