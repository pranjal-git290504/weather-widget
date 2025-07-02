import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState, useEffect } from "react";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Loading...",
    feelsLike: 0,
    humidity: 0,
    temp: 0,
    tempMax: 0,
    tempMin: 0,
    weather: "Loading weather data...",
  });

  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "http://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "d4e5be9b637cb6ac7867c24564b8edd4";

  // Function to get weather by coordinates
  const getWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const jsonResponse = await response.json();

      const result = {
        city: jsonResponse.name,
        temp: jsonResponse.main.temp,
        tempMax: jsonResponse.main.temp_max,
        tempMin: jsonResponse.main.temp_min,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };

      setWeatherInfo(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Fallback to a default city if geolocation fails
      setWeatherInfo({
        city: "Delhi",
        feelsLike: 36.06,
        humidity: 65,
        temp: 30.96,
        tempMax: 30.96,
        tempMin: 30.96,
        weather: "overcast clouds",
      });
      setIsLoading(false);
    }
  };

  // Function to get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByCoords(latitude, longitude);
        },
        // Error callback
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to default city
          setWeatherInfo({
            city: "Delhi",
            feelsLike: 36.06,
            humidity: 65,
            temp: 30.96,
            tempMax: 30.96,
            tempMin: 30.96,
            weather: "overcast clouds",
          });
          setIsLoading(false);
        },
        // Options
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 600000, // 10 minutes
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
      // Fallback to default city
      setWeatherInfo({
        city: "Delhi",
        feelsLike: 36.06,
        humidity: 65,
        temp: 30.96,
        tempMax: 30.96,
        tempMin: 30.96,
        weather: "overcast clouds",
      });
      setIsLoading(false);
    }
  };

  // Get user's location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  return (
    <div style={{ textAlign: "center" }} className="weather-app-container">
      <h2 className="app-title">Weather App By Pranjal Choudhary</h2>
      <SearchBox updateInfo={updateInfo}></SearchBox>
      {isLoading ? (
        <div style={{ color: "white", fontSize: "1.2rem", margin: "20px" }}>
          Getting your location and weather data...
        </div>
      ) : (
        <InfoBox info={weatherInfo}></InfoBox>
      )}
    </div>
  );
}
