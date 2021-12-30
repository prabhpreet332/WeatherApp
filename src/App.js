import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "4062565f5ccfb98032d874bddc0c6960"

function App() {
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [cityName, setCityName] = useState("");
  const [sunriseTime, setSunriseTime] = useState("");
  const [sunsetTime, setSunsetTime] = useState("");
  const [currTime, setCurrTime] = useState("");
  const [temp, setTemp] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  let getLatLon = (position) => {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
  };

  useEffect(() => {

    let getData = async () => {
        await window.navigator.geolocation.getCurrentPosition(getLatLon);

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        let sunriseTime = new Date(res.data.sys.sunrise * 1000);
        let sunsetTime = new Date(res.data.sys.sunset * 1000);
        let currTime = new Date();
        let icon_src = "http://openweathermap.org/img/w/" + res.data.weather[0].icon + ".png";

        setTemp(res.data.main.temp);
        setMinTemp(res.data.main.temp_min);
        setMaxTemp(res.data.main.temp_max);
        setCityName(res.data.name);
        setDescription(res.data.weather[0].description);
        setIcon(icon_src);
        setSunriseTime(sunriseTime.toLocaleTimeString());
        setSunsetTime(sunsetTime.toLocaleTimeString());
        setCurrTime(currTime.toLocaleTimeString());
    };

    getData();
  }, [lat, lon]);

  return (
    <div className="main">
      <div className="main-div">

        <h2 className="text-center">The Weather today at your Current location at {currTime.slice(0, 5)} </h2>
        <h1 className="text-center city_name">{cityName}</h1>

        <div className="weather-details">
          <img className="weather-info" src={icon} alt="" />
          <h2 className="weather-info">{description}</h2>
        </div>

        <div className="table-responsive">
          <div className="">

            <table className="table table-sm table-reponsive">
              <thead className="thead-dark">
                <tr>
                  <th className="data align-middle text-center" scope="col">Sunrise</th>
                  <th className="data align-middle text-center" scope="col">Sunset</th>
                  <th className="data align-middle text-center" scope="col">Current Temperature</th>
                  <th className="data align-middle text-center" scope="col">Minimum Temperature</th>
                  <th className="data align-middle text-center" scope="col">Maximum Temperature</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="data text-center">{sunriseTime}</td>
                  <td className="data text-center">{sunsetTime}</td>
                  <td className="data text-center">{temp} ºC</td>
                  <td className="data text-center">{minTemp} ºC</td>
                  <td className="data text-center">{maxTemp} ºC</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
