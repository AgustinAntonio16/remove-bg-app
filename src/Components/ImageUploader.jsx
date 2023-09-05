import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [outputImage, setOutputImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleImageRemove = () => {
    // Reemplaza 'INSERT_YOUR_API_KEY_HERE' con tu clave de la API Remove.bg
    const apiKey = 'c16xMsG4va1ajKQktPBVNXFj';

    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_file', file);

    axios({
      method: 'post',
      url: 'https://api.remove.bg/v1.0/removebg',
      data: formData,
      responseType: 'arraybuffer',
      headers: {
        'X-Api-Key': apiKey,
      },
      encoding: null,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.error('Error:', response.status, response.statusText);
          return;
        }

        const imageUrl = URL.createObjectURL(
          new Blob([response.data], { type: 'image/png' })
        );
        setOutputImage(imageUrl);
      })
      .catch((error) => {
        console.error('Request failed:', error);
      });
  };

  return (
    <div>
      <h1>Image Background Remover</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleImageRemove}>Remove Background</button>
      {outputImage && (
        <div>
          <h2>Result</h2>
          <img src={outputImage} alt="Removed Background" />
          <a
            href={outputImage}
            download="no-bg.png"
            style={{ display: 'block' }}
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
