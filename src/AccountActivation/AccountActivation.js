import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./AccountActivation.css";
import jwt from 'jsonwebtoken';
import { Redirect } from "react-router-dom";
const AccountActivation = (props) => {
  const [token, setToken] = useState({
    name : "",
    token : "",
    show : true,
  });

  useEffect(()=>{
    let token = props.match.params.token
    let {name} = jwt.decode(token)
    // console.log(name)
    setToken((prevState)=>({
      ...prevState,
      name : name,
      token : token
    }))
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();
      try{
        let res = await axios.post(`${process.env.REACT_APP_API}/account-activation`,{token : token.token})
        let data = res.data
        toast.success(data.message)
        props.history.replace("/login")
      }
      catch(error){
        console.log('Signup error', error.response.data.error)
        toast.error(error.response.data.error)
      }
  };

  return (
    <div className = "activation-message">
      <ToastContainer />
      <form className="form">
        <div className = "container">
          <div className = "welcome-message mb-2">
            Welcome to Google Drive,
          </div>
          <div className = "text-muted mb-2">
            Thank you {token.name}, for registration. Please activate your account
          </div>
          <button className = "btn btn-primary btn-lg" onClick = {(e)=>handleSubmit(e)}>Activate Account</button>
        </div>
      </form>
    </div>
  );
};

export default AccountActivation;
