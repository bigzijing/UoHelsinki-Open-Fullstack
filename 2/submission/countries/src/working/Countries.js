import React, { useEffect } from 'react'

const Countries = ({countries, searchTerm, showAll, setSearchTerm, matches}) => {
  const api_key = process.env.REACT_APP_API_KEY
  console.log(matches.length + "matches observed")
  
  if (matches.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another term</p>
      </div>
    )
  }
  else if (matches.length === 1) {
    return (
      <div>
        <h3>{matches[0].name}</h3>
        <p>capital {matches[0].capital} <br/> population {matches[0].population}</p>
        <h3>languages</h3>
        <ul>
          {matches[0].languages.map((language, i) => (
            <li key={i}>{language.name}</li>
            ))}
        </ul>
        <img src={matches[0].flag} alt={matches[0].name} height="30%" width="30%"/>
        <h3>Weather in {matches[0].name}</h3>
        <p><b>temperature:</b> x degrees</p>
        <img src="" alt="photo" />
        <p><b>wind: </b> something</p>
      </div>
    )
  }
  else{
    return (
      <div>
        {matches.map((country, i) => (
          <div key={i}>
            <p>{country.name}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Countries