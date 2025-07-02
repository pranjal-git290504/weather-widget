import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

export default function InfoBox({ info }) {
  const INIT_URL =
    "https://images.unsplash.com/photo-1594156596782-656c93e4d504?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWR5fGVufDB8fDB8fHww";

  const Hot_URL =
    "https://media.istockphoto.com/id/1312596921/photo/summer-noon-sun.jpg?s=612x612&w=0&k=20&c=1aaFLIWH15zSWmnenmL50XfkiU0sUboEKpIXf3Jx5S0=";
  const Rain_URL =
    "https://media.istockphoto.com/id/1429701799/photo/raindrops-on-asphalt-rain-rainy-weather-downpour.webp?a=1&b=1&s=612x612&w=0&k=20&c=jc45vpqNDgrvRZAn2foO82IhW9rUeXbQfxvLZaDW8H8=";
  const Cold_URL =
    "https://images.unsplash.com/photo-1457269449834-928af64c684d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="InfoBox">
      <div className="cardContainer">
        <Card
          sx={{
            maxWidth: 400,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
          className="weather-card"
        >
          <CardMedia
            sx={{ height: 200 }}
            image={
              info.humidity > 80
                ? Rain_URL
                : info.temp > 15
                ? Hot_URL
                : Cold_URL
            }
            title="Weather Image"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="city-title"
            >
              {info.city}
              {info.humidity > 80 ? (
                <ThunderstormIcon />
              ) : info.temp > 15 ? (
                <WbSunnyIcon />
              ) : (
                <AcUnitIcon />
              )}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component={"span"}
              className="weather-details"
            >
              <div className="weather-info">
                <p>Temperature = {info.temp}&deg;C</p>
                <p>Humidity= {info.humidity}</p>
                <p>Max Temp = {info.tempMax}&deg;C</p>
                <p>Min Temp= {info.tempMin}&deg;C</p>
                <p>
                  The weather can be described as <i>{info.weather}</i>feels
                  like ={info.feelsLike}&deg;C
                </p>
              </div>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
