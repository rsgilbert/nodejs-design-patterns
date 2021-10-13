const stream = require('stream')
const fs = require('fs')
const util = require('util')
const path = require('path')
const mkdirp = require('mkdirp')



function ToFileStream() {
    stream.Writable.call(this, { 
        objectMode: true,
        // set backpressure limit
        highWaterMark: 2 * 1024
    })
}

util.inherits(ToFileStream, stream.Writable)


ToFileStream.prototype._write = function(chunk, encoding, callback) {
    const self = this 
    mkdirp(path.dirname(chunk.path), err => {
        if(err) return callback(err)
        fs.writeFile(chunk.path, chunk.content, callback)
    })
}

module.exports = ToFileStream











