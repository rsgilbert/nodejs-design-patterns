const fs = require('fs')
const { promisify } = require('../utilities')


const readPromisified = promisify(fs.readFile)

readPromisified('../limit-conc.js')
.then()
.then(null, null)
.then(function(d) {
    // console.log('data read is', d)
    throw Error('go to sleep')
})
.catch(function(err) {
    console.log('error is', err)
    throw Error('not caught properly')
})
.then(null, err => console.log('rejected promise. Error is', err))
.then((d) => console.log('final data', d), err => console.log('final err', err))