import React, { useEffect, useState } from 'react';

const NEO = () => {
  const [neoData, setNeoData] = useState(null);

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // get date 7 days ago

    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}&api_key=${process.env.REACT_APP_NASA_API_KEY}`)
      .then(response => response.json())
      .then(data => setNeoData(data))
      .catch(error => console.log(error));
  }, []);

  if (!neoData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Near Earth Objects from the past week</h1>
      {Object.values(neoData.near_earth_objects).flat().map((neo, index) => (
        <div key={index}>
          <h2>{neo.name}</h2>
          <p>{`Close approach date: ${neo.close_approach_data[0].close_approach_date}`}</p>
          <p>{`Estimated diameter: ${neo.estimated_diameter.meters.estimated_diameter_min} - ${neo.estimated_diameter.meters.estimated_diameter_max} meters`}</p>
        </div>
      ))}
    </div>
  );
}

export default NEO;
