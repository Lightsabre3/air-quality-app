
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useState, useEffect } from 'react';

const api = {
  key:'3f0401a085561142a56b12d0cc74f50f',
  url: 'https://api.openweathermap.org/data/2.5/weather',
}

function MyLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null,heading: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          heading: position.coords.heading
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <div>
      <h2>My Current Location</h2>
      {position.latitude && position.longitude ? (
        <p>
          Latitude: {position.latitude}, Longitude: {position.longitude}, Heading: {position.heading}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const App = () => {
  const [search, setSearch] = useState('London')
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.url}?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <div className='app'>
      <h1 className='w-12'>Air Quality in your Area</h1>
        <input  
          type="text" 
          onChange={(e) => setSearch(e.target.value)} 
          className='' 
          />
        <button onClick={searchPressed}>Search</button>

      <MyLocation />
      {typeof weather.main != "undefined" ? <div>
        <h2>City: { weather.name}</h2>
        <p className='text-lg'>Weather :{ weather.main.temp}</p>
        <p>Feels Like: {weather.main.feels_like}</p>
        <p>Description: {weather.weather[0]["description"]}</p>
      </div>
        : <p>Please correctly enter city name </p>}

    </div>
  );
};


export default App
