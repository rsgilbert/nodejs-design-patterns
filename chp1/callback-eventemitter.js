// NDP pg 54
// Pattern: Create a function that accepts a callback and returns 
// an EventEmitter, thus providing a simple and clear entry point for the
// main functionality while emitting more fine grained events  using the EventEmitter


// Lets count to a given limit.
// Every time we reach a number divisble by 1000 we emit 'checkpoint' event
// indicating the number we've reached. 
// When we are done (1 less than limit), we emit the 'end' event

const { EventEmitter } = require("events")
const util = require('util')

function Counter(limit) {
    this.limit = limit
}

// Make Counter an EventEmitter
util.inherits(Counter, EventEmitter)

// auxiliary function to call to kick off the counting
Counter.prototype.count = function _(callback) {
    for(let i = 0; i < this.limit; i++) {
        if(i % 1000 === 0) {
            this.emit('checkpoint', i)
        }
    }
    this.emit('end')
    callback()
}


module.exports = Counter
