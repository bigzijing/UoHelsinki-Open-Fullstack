import React, { useState, useEffect } from 'react';
import axios from "axios"
import Filter from './working/Filter'
import Countries from './working/Countries'

function App() {
  const [ countries, setCountries ] = useState([])
  const [ showAll, setShowAll ] = useState(true)
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    // console.log('effect')
    axios
        .get("https://restcountries.eu/rest/v2/all")
        .then(response => {
          // console.log('promise fulfilled')
          setCountries(response.data)
          // console.log(countries)
        })
  }, [])

  return (
    <div>
      <Filter setShowAll={setShowAll} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Countries countries={countries} searchTerm={searchTerm} showAll={showAll} setSearchTerm={setSearchTerm} />
    </div>
  );
}

export default App;
