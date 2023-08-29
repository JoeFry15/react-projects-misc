import axios from "axios";

const weatherApiUrl = "http://api.weatherapi.com/v1";
const weatherApiKey = process.env.API_KEY;

export async function fetchWeatherByLocation(location: string): Promise<any> {
  const response = await axios(
    `${weatherApiUrl}/current.json?key=${weatherApiKey}&q=${location}&aqi=no`
  );
  if (response.status !== 200) {
    throw new Error(await JSON.stringify(response));
  } else {
    return response;
  }
}

export async function fetchWebsiteForChecker(url: string): Promise<any> {
  const response = await axios(url);
  if (response.status !== 200) {
    throw new Error(await JSON.stringify(response));
  } else {
    console.log(response);
    return response;
  }
}
