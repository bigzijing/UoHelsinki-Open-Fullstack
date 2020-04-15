import React, { useState, useEffect } from 'react'
import axios from "axios"

const Country = ({ countriesToShow }) => {
    const [ city, setCity ] = useState(countriesToShow[0].capital)
    const [ cityWeather, setCityWeather ] = useState({})
    const api_key = process.env.REACT_APP_API_KEY
    console.log(api_key)

    useEffect(() => {
        // console.log('effect')
        axios
            .get('http://api.weatherstack.com/current', {
                params: {
                    access_key: api_key,
                    query: city
                }
            })
            .then(response => {
                // console.log('promise fulfilled')
                // console.log(countries)
                setCityWeather(response.data.current)
            })
        }, [])
    console.log(("http://api.weatherstack.com/current?access_key="+api_key+"&query="+city))
  return (
    <div>
        <h3>{countriesToShow[0].name}</h3>
        <p>capital {countriesToShow[0].capital} <br/> population {countriesToShow[0].population}</p>
        <h3>languages</h3>
        <ul>
        {countriesToShow[0].languages.map((language, i) => (
            <li key={i}>{language.name}</li>
            ))}
        </ul>
        <img src={countriesToShow[0].flag} alt={countriesToShow[0].name} height="30%" width="30%"/>
        <h3>Weather in {countriesToShow[0].name}</h3>
        <p><b>temperature:</b> {cityWeather.temperature} Celcius</p>
        <img src={cityWeather.weather_icons} alt="photo" />
        <p><b>wind: </b> {cityWeather.wind_speed} mph direction {cityWeather.wind_direction}</p>
    </div>
  )
}

export default Country