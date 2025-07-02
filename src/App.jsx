import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import WeatherApps from "./WeatherApps";
import WeatherApp from "./WeatherApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <WeatherApps></WeatherApps> */}
      <WeatherApp></WeatherApp>
      {/* <SearchBox></SearchBox>
      <InfoBox></InfoBox> */}
    </>
  );
}

export default App;
