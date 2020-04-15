import React, { useState, useEffect } from 'react';
import axios from "axios"
import Filter from './Filter'
import Countries from './Countries'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ showAll, setShowAll ] = useState(true)
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ matches, setMatches ] = useState([])

  useEffect(() => {
    // console.log('effect')
    axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(response => {
          // console.log('promise fulfilled')
          setCountries(response.data)
          setMatches(response.data)
          // console.log(countries)
        })
  }, [])

  return (
    <div>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} setMatches={setMatches} countries={countries} />
      <Countries countries={countries} searchTerm={searchTerm} showAll={showAll} setSearchTerm={setSearchTerm} matches={matches} />
    </div>
  );
}

export default App;
