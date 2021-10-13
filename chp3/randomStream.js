// Implementing a readable stream that generates 
// random strings
// A readable stream represents a data source

const stream = require('stream')
const util = require('util')
const chance = require('chance').Chance()


function RandomStream(options) {
    stream.Readable.call(this, options)
}   

util.inherits(RandomStream, stream.Readable)

RandomStream.prototype._read = function(size) {
    // size is ignored as it is an advisory parameter
    // We can also check to see if push returns false
    const chunk = chance.string()
    console.log('Pushing chunk of size', chunk.length, 'and value', chunk)
    // push chunk into internal reading buffer
    this.push(chunk, 'utf8')
    // Terminates stream randomly with a 5% likelihood
    // by pushing null into the internal buffer
    if(chance.bool({ likelihood: 5 })) {
        console.log('pushing EOF')
        this.push(null)
    }
}

module.exports = RandomStream