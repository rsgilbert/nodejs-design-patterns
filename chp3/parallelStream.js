const stream = require('stream')
const util = require('util')


function ParallelStream(userTransform) {
    stream.Transform.call(this, { objectMode: true })
    this.userTransform = userTransform
    this.running = 0 
    this.terminateCallback = null 
}

util.inherits(ParallelStream, stream.Transform)

ParallelStream.prototype._transform = function(chunk, enc, done) {
    this.running++
    // Run an asynchronous operation
    // We bind this on _onComplete so the userTransform function 
    // can not change the this used when calling _onComplete
    this.userTransform(chunk, enc, this._onComplete.bind(this))
    // We completely right away synchronously
    // so we can get started on writing other chunks
    // even before userTransform has completed
    done()
}

// Invoked just before the stream terminates
ParallelStream.prototype._flush = function(done) {
    if(this.running > 0) {
        this.terminateCallback = done 
    } 
    else {
        done()
    }
}

// Invoked everytime an asynchronous task completes.
// Typically invoked by userTransform.
ParallelStream.prototype._onComplete = function(err) {
    this.running--;
    if(err) {
        return this.emit('error', err)
    }
    if(this.running === 0) {
        this.terminateCallback && this.terminateCallback()
    }
}


module.exports = ParallelStream