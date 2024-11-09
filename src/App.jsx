
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useState, useEffect } from 'react';

const api = {
  key:'3f0401a085561142a56b12d0cc74f50f',
  url: 'https://api.openweathermap.org/data/2.5/air_pollution',
}

const geo_api = {
  key:'3f0401a085561142a56b12d0cc74f50f',
  url: 'https://api.openweathermap.org/geo/1.0/direct',
}


function MyLocation() {
  const [position, setPosition] = useState({ latitude: null, longitude: null,heading: null });

  useEffect(() => {
    console.log("Entered MyLocation")
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
  const [search, setSearch] = useState('Simi Valley')
  const [airquality, setAirQuality] = useState({});
  const [geo, setGeo] = useState({});

  const searchPressed = () => {
    console.log("Search Pressed")
    console.log(search)
    
    fetch(`${geo_api.url}?q=${search}&limit=5&APPID=${geo_api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("after calling geo code API")
        console.log(result)
        setGeo(result)
        })
      .catch((error) => {
        console.log(error)
      })

      fetch(`${api.url}?lat=${geo[0].lat}&lon=${geo[0].lon}&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("after calling air quality API")
        console.log(result)
        setAirQuality(result)
        console.log(airquality.list[0].main.aqi)
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
      {typeof airquality.list[0].main != "undefined" ? <div>
        <h2 className='text-lg'>Air Quality Index : {airquality.list[0].main.aqi}</h2>
        <p>Concentration of Carbon Monoxide: {airquality.list[0].components.co} μg/m3</p>
        <p>Concentration of Nitrogen Monoxide: {airquality.list[0].components.no} μg/m3</p>
        <p>Concentration of Nitrogen Dioxide: {airquality.list[0].components.no2} μg/m3</p>
        <p>Concentration of Ozone: {airquality.list[0].components.o3} μg/m3</p>
        <p>Concentration of Sulphur Dioxide: {airquality.list[0].components.so2} μg/m3</p>
        <p>Concentration of Fine Particles Matter: {airquality.list[0].components.pm2_5} μg/m3</p>
        <p>Concentration of Coarse Particles Matter: {airquality.list[0].components.pm10} μg/m3</p>
        <p>Concentration of Ammonia: {airquality.list[0].components.nh3} μg/m3</p>
      </div>
        : <p>Please correctly enter city name </p>}

    </div>
  );
};


export default App
