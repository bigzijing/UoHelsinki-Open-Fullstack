import React from 'react'
import personService from '../services/persons'

const Persons = ({persons, searchTerm, showAll, setPersons}) => {
  const peopleToShow = showAll
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(searchTerm.toUpperCase()))

  const handleClick = (id) => {
    if (window.confirm(`Delete ${id}?`)) {
      personService
        .del(id)
        .then((res) => {
          console.log(persons)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <ul>
      {peopleToShow.map((person, i) =>
      <p key={i}>{person.name} {person.number} <button onClick={() => handleClick(person.id)}>delete</button></p>
      )}
    </ul>
  )
}

export default Persons