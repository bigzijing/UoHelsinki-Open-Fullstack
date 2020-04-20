const mongoose = require('mongoose')

var displayPhonebook = false

if ( process.argv.length === 3) {
  displayPhonebook = true
}
else if ( process.argv.length !==5 ) {
  console.log('wrong argument format')
  console.log('correct format:')
  console.log('node mongo.js <password> <New Name> <New Number>')
  process.exit(1)
}

const newName = process.argv[3]
const newNumber = process.argv[4]

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (displayPhonebook) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
    process.exit(0)
  })
}
else {
  const person = new Person({
    name: newName,
    number: newNumber
  })

  person.save().then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
}

// node mongo.js jvalnRCeoXYIxaNy
// mongodb+srv://fullstack:<password>@cluster0-hvzz4.mongodb.net/test?retryWrites=true&w=majority
// jvalnRCeoXYIxaNy