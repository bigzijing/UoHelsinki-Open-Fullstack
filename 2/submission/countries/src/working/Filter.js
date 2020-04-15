import React from 'react'

const Filter = ({ searchTerm, setSearchTerm, setMatches, countries }) => { 
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        setMatches(countries.filter(country => country.name.toUpperCase().includes(searchTerm.toUpperCase())))
    }

  return (
    <div>
      find countries <input value={searchTerm} onChange={handleSearch}/>
    </div>
  )
}

export default Filter