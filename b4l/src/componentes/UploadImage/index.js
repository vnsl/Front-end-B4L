import "./styles.css";
// import useAuth from '../../hook/useAuth';

function UploadImage({ baseImage, setBaseImage }) {
  // const { userPersistido } = useAuth();

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);  
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
    <div className="image-upload-container" >
      <div className="image-upload" style={{ backgroundImage: `url(${baseImage})`, backgroundSize: 'cover' , borderRadius: '50%' }} >

      </div>
      <input
        type="file"
        onChange={(e) => {
          uploadImage(e);
        }}
      />
    </div>
  );
}

export default UploadImage;