// Making an object observable

// Implementing "Find pattern" functionality in an object
// We later create a findPatternObject and observe it

const EventMitter = require('events').EventEmitter;
const util        = require('util')


// Define FindPattern prototype
function FindPattern(regex) {
    EventMitter.call(this)
    this.regex = regex;
    this.files = []
}

// Make FindPattern inherit the functionality of EventEmitter
util.inherits(FindPattern, EventMitter)

FindPattern.prototype.addFile = function _(file) {
    this.files.push(file)
    return this
}

FindPattern.prototype.find = function _() {
    let self = this 
    self.files.forEach(function _(file) {
        require('fs').readFile(
            file, 'utf8', function _(err, content) {
                // Events emitted inside this function are emitted
                // asynchronously which means there is enough time
                // to setup the listeners
                if(err) {
                    return self.emit('error', err)
                }
                self.emit('fileread', file)
                let match = null 
                if(match = content.match(self.regex)) {
                    match.forEach(elem => 
                        self.emit('found', file, elem)
                    )
                }
            }
        )
    })
    return this
}

const findPatternObject = new FindPattern(/const/g);

findPatternObject
.addFile('./exp-cons-usage.js')
.addFile('../add')
.addFile('./monkey-patching-usage.js')
.find()
.on('found', function _(file, match) {
    console.log('found', match, 'for', file)
})
.on('error', function _(err) {
    console.log('error ->', err)
})
