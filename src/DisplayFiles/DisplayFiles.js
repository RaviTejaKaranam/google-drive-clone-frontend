import React, { Fragment } from "react";
// import { toast, ToastContainer } from "react-toastify";
import "./DisplayFiles.css";
const DisplayFiles = () => {
  const { files } = JSON.parse(localStorage.getItem("user"));
  let display;
  if (!files.length) {
    return <p>Please add some files</p>;
  } else {
    display = files.map((file) => {
      if (file.file) {
        // console.log(file.error.code);
        return (
          <div key={file.file} className="file-box">
            <li className="file-list">
              <a href={file.location} key={file.file}>
                <i className="fas fa-file fa-4x file-icon"></i>
              </a>
              <p>{`${file.file.slice(0, 5)}...${file.file.slice(
                file.file.length - 3
              )}`}</p>
            </li>
          </div>
        );
      } else {
        console.log(file)
        // toast.error("File limit exceeded");
      }
    });
  }
  return(
  <Fragment>
    <div className="display-files">{display}</div>
  </Fragment>
  )
};

export default DisplayFiles;
