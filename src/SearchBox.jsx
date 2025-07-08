import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "d4e5be9b637cb6ac7867c24564b8edd4";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let jsonResponse = await response.json();
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMax: jsonResponse.main.temp_max,
        tempMin: jsonResponse.main.temp_min,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
    // clearing the error when start typing
    if (error) {
      setError(false);
    }
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(city);
      setError(false); //clearing the previous error
      setCity("");
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit} className="search-form">
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
          className="search-input"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
            },
            "& .MuiInputLabel-root": {
              color: "rgba(255, 255, 255, 0.7)",
            },
            "& .MuiInputBase-input": {
              color: "white",
            },
          }}
        />
        <br />
        <br />
        <Button
          variant="contained"
          type="submit"
          className="search-button"
          sx={{
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            border: 0,
            borderRadius: 25,
            boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
            color: "white",
            height: 48,
            padding: "0 30px",
            "&:hover": {
              background: "linear-gradient(45deg, #1976D2 30%, #1976D2 90%)",
            },
          }}
        >
          Search
        </Button>
        {error && <p className="error-text">No such place exist!</p>}
      </form>
    </div>
  );
}
