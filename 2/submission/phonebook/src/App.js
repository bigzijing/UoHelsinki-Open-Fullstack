import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'
// import { isCompositeComponent } from 'react-dom/test-utils'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ showAll, setShowAll ] = useState(true)
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState([null, false])

  useEffect(() => {
    /* axios
        .get("http://localhost:3001/persons")
        .then(response => {
          setPersons(response.data)
        }) */
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter setShowAll={setShowAll} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setMessage={setMessage} />
      
      <h3>Numbers</h3>
      <Persons persons={persons} searchTerm={searchTerm} showAll={showAll} setPersons={setPersons} />
    </div>
  )
}

export default App