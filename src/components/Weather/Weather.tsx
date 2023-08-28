import { useEffect, useState } from "react";
import "./Weather.css";
import axios from "axios";

export function Weather() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [location, setLocation] = useState<string>("London");
  const [inputValue, setInputValue] = useState("");

  const url = `http://api.weatherapi.com/v1/current.json?key=${
    import.meta.env.VITE_WEATHER_KEY
  }&q=${location}&aqi=no`;

  useEffect(() => {
    axios(url).then((response) => {
      setWeatherData(response.data);
    });
  }, [location]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLocation(inputValue);
  };

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <h2>Weather</h2>
      {weatherData !== null ? (
        <>
          <p>Location: {weatherData.location.name}</p>
          <p>Local Time: {weatherData.location.localtime}</p>
          <p>Temperature: {weatherData.current.temp_c} C</p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
      <h3>Enter location</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <input type="submit" />
      </form>
    </>
  );
}
