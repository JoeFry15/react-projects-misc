import { fetchWeatherByLocation } from "../../clients/apiClient";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

test("expect weather API call to fetch correct location", async () => {
  const weatherApiUrl = "http://api.weatherapi.com/v1";
  const weatherApiKey = process.env.API_KEY;

  const mockResponseData = {
    location: {
      name: "London",
    },
  };
  mockAxios
    .onGet(`${weatherApiUrl}/current.json?key=${weatherApiKey}&q=London&aqi=no`)
    .reply(200, mockResponseData);

  const response = await fetchWeatherByLocation("London");

  expect(response.data.location.name).toBe("London");
  expect(response.status).toBe(200);
});
