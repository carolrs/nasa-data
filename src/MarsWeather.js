import { useEffect, useState } from "react";
import "./MarsWeather.css";

const MarsWeather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetch(`https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0
    `)
    .then(response => response.json())
    .then(data => {
      console.log(data);  
      const sol_keys = data.sol_keys;
      console.log(sol_keys);
      const temps = sol_keys.map((sol) => data[sol]?.AT?.av); 
      console.log(temps);
      setWeatherData({sol_keys, temps});
    })
    .catch(error => console.log(error));
}, []);

return (
  <div className="mars-weather">
    <h1 className="weather-title">Weather at Elysium Planitia</h1>
    <h2>High:24	F	|	C Low:-139.8	F	|	C</h2>
    <div className="sol-card-container">
      {weatherData && weatherData.sol_keys.length > 0 ? (
        weatherData.sol_keys.map((sol, index) => (
          <div key={sol} className="sol-card">
            <p>Sol {sol}: {weatherData.temps[index] ? `${weatherData.temps[index]}°F` : 'Data not available'}</p>      
          </div>       
        ))
      ) : (
        <p>Data not currently available, please try again later.</p>
      )}
    </div>
  </div>
);


      }

export default MarsWeather;