import React from 'react'
import Button from '../working/Button'
import Country from '../components/Country'

const Countries = ({countries, searchTerm, showAll, setSearchTerm}) => {
  const countryMatches = countries.filter(country => country.name.toUpperCase().includes(searchTerm.toUpperCase()))
  const countriesToShow = showAll
    ? countries
    : countryMatches  
  const matchLength = countriesToShow.length

  if (matchLength === 1) {
    return (
      <Country countriesToShow={countriesToShow} />
    )
  } else if (matchLength > 10) {
    return (
      <div>
        <p>Too many matches, specify another term</p>
      </div>  
    )
  } else {
    return (
      (    
        countriesToShow.map((country, i) => (
          <div key={i}>
            <p><Button name={country.name} setSearchTerm={setSearchTerm} /></p>
          </div>
        )))
    )
  }
}

export default Countries