import axios from "axios";
import { useEffect, useState } from "react";
import { stringSimilarity } from "string-similarity-js";
import "./WebsiteChecker.css";

export function WebsiteChecker() {
  const [similarity, setSimilarity] = useState<number | null>(null);

  const urlToCheck = `http://api.weatherapi.com/v1/current.json?key=${
    import.meta.env.VITE_WEATHER_KEY
  }&q=London&aqi=no`;

  useEffect(() => {
    axios.get(urlToCheck).then((response) => {
      console.log(response.data);
      localStorage.setItem("apiResponse", JSON.stringify(response.data));
    });
  }, []);

  const handleCheckData = async () => {
    try {
      const result = await checkSite(urlToCheck); // Replace 'number' with the type you expect
      setSimilarity(result);
    } catch (error) {
      console.error("Error checking data:", error);
    }
  };

  return (
    <>
      <h1>Website Checker</h1>
      <p>
        A page designed to check whether a website is loading successfully, by
        checking against a response stored in local data on initial render.
      </p>
      <p>
        Currently checking: <a href={urlToCheck}>{urlToCheck}</a>
      </p>
      <button className="similarity-button" onClick={handleCheckData}>
        Check similarity
      </button>
      {similarity ? <p>Current similarity: {similarity}%</p> : ""}
    </>
  );
}

async function checkSite(url: string): Promise<number> {
  const storedDataString = localStorage.getItem("apiResponse");
  const currentDataString = await axios
    .get(url)
    .then((response) => JSON.stringify(response.data));
  if (storedDataString !== null) {
    return Promise.resolve(
      stringSimilarity(storedDataString, currentDataString) * 100
    );
  } else {
    console.log("No data found in localStorage");
    return Promise.resolve(0);
  }
}
