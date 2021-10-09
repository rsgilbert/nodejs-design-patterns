// The observer pattern defines an object
// (called subject) which can notify a set of 
// observers (or listeners) when a change in its state happens

const EventMitter = require('events').EventEmitter;
const eeInstance = new EventMitter()


// Notify subscribers when a particular pattern is found 
// in a list of files

function findPattern(filePaths, regex) {
    const emitter = new EventMitter()
    filePaths.forEach(function(filePath) {
        // Events should be emitted later
        process.nextTick(() => emitter.emit('attempt', filePath))
        require('fs').readFile(
            require('path').resolve(filePath), 'utf8', function _(err, content) {
            if(err) {
                return emitter.emit('error', err)
            }
            emitter.emit('fileread', filePath)
            let match 
            if(match = content.match(regex)) {
                match.forEach(function _(elem) {
                    emitter.emit('found', filePath, elem)
                })
            }
        })
    })
    return emitter;
}

findPattern(
    [
        './substack.js',
        '../chp1/gl.js',
        '../chp1/gl2.js',
        '../chp1/gl',
        '../chp5/gl2.js'
    ],
    /{/g
)
// .on('attempt', (filePath) => {
//     console.log('Attempting to read file at path', filePath)
// })
// .on('fileread', filePath => {
//     console.log('file has been read', filePath)
// })
// .on('found', function(filePath, elem) {
//     console.log('match has been found in file', filePath, 'matched element is', elem)
// })
// .on('error', err => {
//     console.log('Error emitted', err.message)
// })