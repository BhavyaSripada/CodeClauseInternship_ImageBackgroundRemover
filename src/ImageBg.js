import React, { useState } from 'react';
import './custom.scss';

function ImageBg() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [bgremover, setBgremover] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleBg = () => {
    const APIkey = 'NkP9E6eJTi3Z1diFTdn3ELyw';
    const url = 'https://api.remove.bg/v1.0/removebg';

    const formData = new FormData();
    formData.append('image_file', image, image.name);
    formData.append('size', 'auto');

    fetch(url, {
      method: 'POST',
      headers: {
        'X-Api-Key': APIkey,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed');
        }
        return res.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBgremover(reader.result);
          setError(null);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error(error);
        setError('An error occurred while processing the image.');
      });
  };

  return (
    <div className="container">
      <h1 className="font-semibold">Remove Background for your Image</h1>
      <input type="file" onChange={handleImageChange} />
      {imageUrl && (
        <div>
          <h4>Selected Image:</h4>
          <img src={imageUrl} alt="Selected" width="300" />
        </div>
      )}
      <button className="bg-info remove" onClick={handleBg} disabled={!image}>
        Remove Background
      </button>
      {bgremover && (
        <div>
          <h4>The background is removed successfully!:</h4>
          <img src={bgremover} alt="Processed" width="300" />
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default ImageBg;
