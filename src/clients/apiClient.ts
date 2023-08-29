import axios from "axios";

const weatherApiUrl = "http://api.weatherapi.com/v1";
const weatherApiKey = process.env.API_KEY;

export async function fetchWeatherByLocation(location: string): Promise<any> {
  try {
    const response = await axios.get(
      `${weatherApiUrl}/current.json?key=${weatherApiKey}&q=${location}&aqi=no`
    );
    return response;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}

export async function fetchWebsiteForChecker(url: string): Promise<any> {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
}
