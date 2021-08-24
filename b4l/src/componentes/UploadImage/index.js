import "./styles.css";
// import useAuth from '../../hook/useAuth';

function UploadImage({ setBaseImage }) {
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
    <div>
      <label className="label-arquivo" htmlFor="arquivo">Selecione a imagem do produto</label>
      <input
          type="file"
          name="arquivo"
          id="arquivo"
          accept="image/*"
          onChange={(e) => {
            uploadImage(e);
          }}
      />
    </div>
  );
}

export default UploadImage;