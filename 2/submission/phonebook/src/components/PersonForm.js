import React from 'react'
import personService from '../services/persons'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setMessage}) => {
  const addName = (event) => {
    event.preventDefault()
    const nameObject = { name: newName,
                         number: newNumber, }

    if (persons.some(e => e.name === newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const personUpdate = { ...person, number: newNumber }
        personService
          .update(person.id, personUpdate)
          .then(returnedPerson => {
            // console.log(returnedPerson)
            setPersons(persons.map(p => p !== person ? p : returnedPerson))
            
            setMessage(`Changed the number of ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage('Information of ' + person.name + ' has already been removed from server')
            setPersons(persons.filter(p => p.name !== newName))
          })
      }
    }
    else {
      /* axios.post(
        'http://localhost:3001/persons',
        nameObject)
        .then(response => {
          console.log(response)
        }) */
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      // console.log(persons)
      setMessage(`Added ${nameObject.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
    </>
  )
}

export default PersonForm