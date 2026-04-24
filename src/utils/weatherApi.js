import { weatherOptions } from "../utils/constants.js";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(result.temp.F);
  result.condition = mapApiCondition(data.weather[0].main.toLowerCase());
  result.isDay = isDay(data.sys, Date.now());

  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 80) {
    return "hot";
  } else if (temperature >= 60 && temperature < 80) {
    return "warm";
  } else {
    return "cold";
  }
};

const mapApiCondition = (apiCondition) => {
  const mapping = {
    clear: "clear",
    clouds: "cloudy",
    thunderstorm: "stormy",
    storm: "stormy",
    rain: "rainy",
    snow: "snowy",
    mist: "foggy",
    fog: "foggy",
  };
  return mapping[apiCondition] || apiCondition;
};
