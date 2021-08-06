import React, { useState } from "react";
// import Dropzone from 'react-dropzone';
import "./styles.css";

function UploadImage() {
  const [baseImage, setBaseImage] = useState("");

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
    <div className="image-upload">
      <input
        type="file"
        style={{ backgroundImage: `url(${baseImage})`, height: '384px', width: '384px', borderRadius: '16px'}}
        onChange={(e) => {
          uploadImage(e);
        }}
      />
    </div>
  );
}

export default UploadImage;