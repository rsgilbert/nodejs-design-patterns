// A factory can also be used as a mechanism to
// enforce encapsulation using function scopes and closures.

function createPerson(name) {
    const privateProperties = {

    }

    const person = {
        setName(name) {
            if(!name) {
                throw Error('A person must have a name')
            }
            privateProperties.name = name;
        },

        getName() {
            return privateProperties.name;
        }
    }

    person.setName(name)
    return person;
}

module.exports = createPerson