export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rainy",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "stormy",
    url: new URL("../assets/day/storm.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snowy",
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "foggy",
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rainy",
    url: new URL("../assets/night/rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "stormy",
    url: new URL("../assets/night/storm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snowy",
    url: new URL("../assets/night/snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "foggy",
    url: new URL("../assets/night/fog.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },
  night: { url: new URL("../assets/night/default.png", import.meta.url).href },
};

export const coordinates = {
  latitude: 39.049649,
  longitude: -77.113614,
};

export const APIkey = "04b84d8f591d37ae36b67157bfce92bc";
