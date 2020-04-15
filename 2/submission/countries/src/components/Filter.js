import React from 'react'

const Filter = ({setShowAll, searchTerm, setSearchTerm}) => { 
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
        if (event.target.value.length > 0) {
            setShowAll(false)
        }
        else setShowAll(true)
    }

  return (
    <div>
      find countries <input value={searchTerm} onChange={handleSearch}/>
    </div>
  )
}

export default Filter