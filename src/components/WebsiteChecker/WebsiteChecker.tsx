import axios from "axios";
import { useEffect, useState } from "react";

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
      <button onClick={handleCheckData}>Check data</button>
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
      similarity(storedDataString, currentDataString) * 100
    );
  } else {
    console.log("No data found in localStorage");
    return Promise.resolve(0);
  }
}

function similarity(s1: string, s2: string) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / longerLength;
}

function editDistance(s1: string, s2: string) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
