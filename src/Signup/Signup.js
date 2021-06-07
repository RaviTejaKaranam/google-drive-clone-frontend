import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/google-drive-logo.png";
import signupImage from "../images/signup-image.png";
import SignupCard from "../SignupCard/SignUpCard";
import "./signup.css";
const Signup = () => {
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
          <Link to="/login" className = "mr-3">
            <button className="btn btn-primary my-2 my-sm-0 mr-3" type="button">
              Login
            </button>
          </Link>
          <Link to="/" className = "mr-3">
            <button
              className="btn btn-outline-primary my-2 my-sm-0 mr-3"
              type="button"
            >
              Home
            </button>
          </Link>
        </form>
      </nav>
      <div className="container signup">
        <div className="row">
          <div className="col-lg-5 col-sm-12">
            <img
              src={signupImage}
              alt="Signup image"
              className="signup-image"
            />
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-5 col-sm-12 signup-card mb-2">
            <SignupCard />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
