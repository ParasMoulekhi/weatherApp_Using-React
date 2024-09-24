import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const currentDate = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Augt",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = currentDate.getFullYear();
  const month = monthNames[currentDate.getMonth()];
  const date = currentDate.getDate();
  const formatDate = `${month} ${date}, ${year}`;

  const Api_key = "eb37852b0f3d83927686d90e972366c8";

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fahrenheitToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2); // Convert Fahrenheit to Celsius and round to 2 decimal places
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clouds":
        return "./thunder.png";
      case "Clear":
        return "./clear.png";
      case "Rain":
        return "./rain_with_clound.png";
      case "Mist":
        return "./Tornado.png";
      case "Haze":
        return "./sun.png";
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        {weatherData && (
          <>
            <h1 className="container_date ">{formatDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>
              <img
                src={getWeatherIcon(weatherData.weather[0].main)}
                alt="thunder"
                className="container_img"
                width="170px"
              />
              <h2 className="container_degree">
                {fahrenheitToCelsius(weatherData.main.temp)}
              </h2>
              <h2 className="country_per">{weatherData.weather[0].main}</h2>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter City Name"
                  className="input"
                  name={city}
                  onChange={handleInputChange}
                />
                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
