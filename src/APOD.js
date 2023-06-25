import React, { useEffect, useState } from 'react';

const APOD = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
      .then(response => response.json())
      .then(data => setImageData(data))
      .catch(error => console.log(error));
  }, []);

  if (!imageData) return <div className='font-bold'>Loading...</div>;

  return (
    <div className='font-bold '>
      <h1 >{imageData.title}</h1>
      <img src={imageData.url} alt={imageData.title} />
      <p className='bg-white'>{imageData.explanation}</p>
    </div>
  );
}

export default APOD;
