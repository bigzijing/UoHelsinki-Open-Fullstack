import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
// import { isCompositeComponent } from 'react-dom/test-utils'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ searchTerm, setSearchTerm ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = { name: newName,
                         number: newNumber, }

    if (persons.some(e => e.name === newName)){
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    var fil = event.target.value.toUpperCase()
    setSearchTerm(event.target.value)
    if (event.target.value.length > 0) {
      setShowAll(false)
    }
    else setShowAll(true)
    return fil
  }

  const peopleToShow = showAll
  ? persons
  : persons.filter(person => person.name.toUpperCase().includes(searchTerm.toUpperCase()))

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>

      filter shown with <input value={searchTerm} onChange={handleSearch}/>
      
      <h3>add a new</h3>

      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      
      <h3>Numbers</h3>
      
      <
        ul>
        {peopleToShow.map((person, i) =>
          <p key={i}>{person.name} {person.number}</p>
        )}
      </ul>
    </div>
  )
}

export default App