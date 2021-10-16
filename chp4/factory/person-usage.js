// Use createPerson factory
const createPerson = require('./person')

const person = createPerson('John Maleke')
console.log('Person name is', person.getName())

person.setName('Peter')
console.log('person 2 name is', person.getName())

console.log('Name is', person.getName())
person.setName('John john')
console.log(person)