const { createProxyUsingInheritance } = require('./composition')


function Meeting(name) {
    this.name = name
}

Meeting.prototype.hello = function () {
    return 'Hello ' + this.name
}

Meeting.prototype.goodbye = function (toName) {
    console.log('Goodbye from', this.name, 'to', toName)
}

const meeting1 = new Meeting('Potato')
const meeting1Proxy = createProxyUsingInheritance(meeting1)

console.log('** Meeting 1 **')
console.log(meeting1.hello())
meeting1.goodbye('Mary')

console.log('** Meeting 1 proxy **')
console.log(meeting1Proxy.hello())
meeting1Proxy.goodbye('Jane')

console.log(meeting1Proxy instanceof Meeting)