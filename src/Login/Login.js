import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../images/google-drive-logo.png";
import loginImage from "../images/login-image.png";
import LoginCard from "../LoginCard/LoginCard";
import "./Login.css";
const Login = () => {
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
          <Link to="/signup" className="mr-3">
            <button className="btn btn-primary my-2 my-sm-0 mr-3" type="button">
              Sign Up
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
      <div className="container login">
        <div className="row">
          <div className="col-lg-4 col-sm-12">
            <img src={loginImage} alt="login-image" className="login-image" />
          </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-1"></div>
          <div className="col-lg-4 col-sm-12 login-card mt-5 mb-2">
            <LoginCard />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
