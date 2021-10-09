const req2 = require('./req2')


// console.log(req2)

// When we require the same module again nodejs picks the module
// from the module cache
const req2Again = require('./req2')
console.log(req2Again, req2)
console.log(req2 === req2Again)
console.log(require.cache)

// console.log(require.resolve('./req2'))

const path = require.resolve('fs')
// console.log(path)