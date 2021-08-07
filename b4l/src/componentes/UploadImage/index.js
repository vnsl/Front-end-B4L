// import React, { useState } from "react";
// import Dropzone from 'react-dropzone';
import "./styles.css";

function UploadImage({ baseImage, setBaseImage }) {
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="image-upload" style={{ backgroundImage: `url(${baseImage})`, backgroundSize: 'cover' , borderRadius: '50%' }}>
      <input
        type="file"
        onChange={(e) => {
          uploadImage(e);
        }}
      />
      {/* <img src={baseImage} alt="" /> */}
    </div>
  );
}

export default UploadImage;