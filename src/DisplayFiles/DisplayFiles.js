import React from "react";
import "./DisplayFiles.css";
const DisplayFiles = () => {
  const { files } = JSON.parse(localStorage.getItem("user"));
  let display;
  if (!files.length) {
    return <p>Please add some files</p>;
  } else {
    display = files.map((file) => {
      if(!file.file){
        console.log(file.error.code)
      }
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
    });
  }
  return <div className="display-files">{display}</div>;
};

export default DisplayFiles;
