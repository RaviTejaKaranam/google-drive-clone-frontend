import React, { Fragment, useState } from "react";
import logo from "../images/google-drive-logo.png";
import { isAuthenticated, signout } from "../Helpers/helpers";
import "./HomePage.css";
import axios from "axios";
import DisplayFiles from "../DisplayFiles/DisplayFiles";
import { toast, ToastContainer } from "react-toastify";
const HomePage = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState(null);
  const { name, _id } = isAuthenticated();
  //Upload file
  const fileUploadClick = (e) => {
    e.preventDefault();
    const uploadButton = document.getElementById("file-upload-button-hidden");
    uploadButton.click();
  };
  //Selecting a file
  const selectFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setSelectedFile((prevState) => ({
      ...prevState,
      selectedFile,
    }));
    const data = new FormData();
    let fileName = selectedFile.name;
    data.append("file", selectedFile, fileName);
    data.append("id", _id);
    //post request to upload file in AWS S3
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/file-upload`,
        data,
        {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data`,
          },
        }
      );
      console.log(res.data);
      const userData = JSON.parse(localStorage.getItem("user"));
      // console.log("User Data", userData);
      const setuserData = { ...userData, files: [...userData.files, res.data] };
      // console.log("Set User Data", setuserData);
      localStorage.setItem("user", JSON.stringify(setuserData));
      const { files } = JSON.parse(localStorage.getItem("user"));
      setFiles((prevState) => ({
        ...prevState,
        files,
      }));
      toast.success("File added successfully");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <div className="landing-page">
      <ToastContainer />
      <nav className="navbar navbar-light bg-white">
        <div className="navbar-brand">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top mr-3"
            alt=""
          />
          Hey, <span className="text-muted">{name}</span>
        </div>
        <form className="form-inline">
          <span
            onClick={() => {
              signout(() => {
                props.history.replace("/");
              });
            }}
            className="mr-3"
          >
            <button
              className="btn btn-outline-primary my-2 my-sm-0 mr-3"
              type="button"
            >
              Logout
            </button>
          </span>
        </form>
      </nav>
      <form>
        <input
          type="file"
          name="file"
          className="file-upload-button-hidden"
          id="file-upload-button-hidden"
          onChange={(e) => {
            selectFileUpload(e);
          }}
        />
        <button
          className="btn btn-primary upload"
          onClick={(e) => {
            fileUploadClick(e);
          }}
        >
          Add File
        </button>
      </form>
      <div className="container display-files">
        <DisplayFiles files={files} />
      </div>
    </div>
  );
};

export default HomePage;
