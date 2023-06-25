import React, { useEffect, useState } from 'react';

const APOD = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`)
      .then(response => response.json())
      .then(data => setImageData(data))
      .catch(error => console.log(error));
  }, []);

  if (!imageData) return <div className='loading-apod font-bold'>Loading...</div>;

  return (
  
    <div className='apod font-bold '>
      <div className='title-astronomy'>
          <h2 >Astronomy Picture of the Day</h2>
          </div>
      <h1 className= 'apod-title'>{imageData.title}</h1>
      <img src={imageData.url} alt={imageData.title} />
      <p className='apod-text bg-white'>{imageData.explanation}</p>
    </div>
  );
}

export default APOD;
