import { useEffect, useState } from "react";
import "./Weather.css";
import { fetchWeatherByLocation } from "../../clients/apiClient";

export function Weather() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [location, setLocation] = useState<string>("London");
  const [inputValue, setInputValue] = useState<string>("");
  const [tempUnit, setTempUnit] = useState<number>(1);

  useEffect(() => {
    fetchWeatherByLocation(location).then((response) => {
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
          <p>
            {"Temperature: "}
            {tempUnit ? weatherData.current.temp_c : weatherData.current.temp_f}
            °{tempUnit ? "C" : "F"}
          </p>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
      <button
        className={tempUnit ? "temp-button-deselected" : "temp-button-selected"}
        onClick={() => setTempUnit(0)}
      >
        °F
      </button>
      <button
        className={tempUnit ? "temp-button-selected" : "temp-button-deselected"}
        onClick={() => setTempUnit(1)}
      >
        °C
      </button>
      <h3>Enter location</h3>
      <form className="location-form" onSubmit={handleSubmit}>
        <label>
          <input type="text" value={inputValue} onChange={handleChange} />
        </label>
        <input type="submit" />
      </form>
    </>
  );
}
