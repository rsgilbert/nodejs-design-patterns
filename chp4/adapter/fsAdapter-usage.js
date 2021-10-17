// Replace fs with our adapter
// const fs = require('fs')
const fsAdapter = require('./fsAdapter')
const levelup = require('level')

const db = levelup('./fsDB', { valueEncoding: 'binary' })

// We've adapted the LevelUP API to be compatible
// with the fs core module
// Any operation performed using our adapter
// will be converted into an operation performed on
// a LevelUP database.
const fs = fsAdapter(db)

const fileName = './my-file.txt'

// write and read a file
fs.writeFile(fileName, 'Hey there', function() {
    fs.readFile(fileName, { encoding: 'utf8' }, function(err, res) {
        if(err) {
            return console.log('First error is failed to read', err)
        }
        console.log('First response is', res)
    })
})


// Try to read a missing file
fs.readFile('missing.txt', { encoding: 'utf8' }, function(err, res) {
    if(err) {
        return console.log('Second error:', err)
    }
    console.log('Second read:', res)
})