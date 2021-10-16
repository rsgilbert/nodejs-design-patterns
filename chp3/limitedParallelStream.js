const stream = require('stream')
const util = require('util')


function LimitedParallelStream(concurrency, userTransform) {
    stream.Transform.call(this, { objectMode: true })
    this.userTransform = userTransform
    this.running = 0 
    // Callback for _flush method
    this.terminateCallback = null 
    // Callback for pending _transform method
    this.continueCallback = null 
    this.concurrency = concurrency
}

util.inherits(LimitedParallelStream, stream.Transform)

LimitedParallelStream.prototype._transform = function(chunk, enc, done) {
    this.running++
    // Run an asynchronous operation
    // We bind this on _onComplete so the userTransform function 
    // can not change the this used when calling _onComplete
    this.userTransform(chunk, enc, this._onComplete.bind(this))
    // We have to check whether we have any free execution
    // slots before we invoke done() and trigger the processing
    // of the next item
    if(this.running < this.concurrency) {
        // done will call afterTransform which
        // will end up either calling _flush or _transform again with a new chunk
        done()
    }
    else {
        this.continueCallback = done 
    }
}

// Invoked just before the stream terminates
LimitedParallelStream.prototype._flush = function(done) {
    debugger
    if(this.running > 0) {
        // If there are still some running tasks then 
        // we save the terminate callback to be run
        // when they are complete
        this.terminateCallback = done 
    } 
    else {
        done()
    }
}

// Invoked everytime an asynchronous task completes.
// Typically invoked by userTransform.
LimitedParallelStream.prototype._onComplete = function(err) {
    this.running--;
    if(err) {
        return this.emit('error', err)
    }
    if(this.running === 0 && this.continueCallback === null) {
        this.terminateCallback && this.terminateCallback()
    }
    if(this.continueCallback) {
        const cb = this.continueCallback
        this.continueCallback = null
        cb && cb()
    }

}


module.exports = LimitedParallelStream