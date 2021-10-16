// An example of proxy pattern in use
// We build an object that acts as a 
// proxy to a Writable stream by intercepting
// all the calls to the write() method
// and logging a message everytime this happens
// We use object composition for our proxy implementation
const fs = require('fs')
const writable = fs.createWriteStream('./writable.log')




function createLoggingWritable(writableOrig) {
    let proto = Object.getPrototypeOf(writableOrig)

    function LoggingWritable(subject) {
        this.writableOrig = subject;
    }

    LoggingWritable.prototype = Object.create(proto)

    LoggingWritable.prototype.write = 
        function(chunk, encoding, callback) {
        if(!callback && typeof encoding === 'function') {
            callback = encoding;
            encoding = undefined;
        }
        console.log('Writing', chunk);
        return this.writableOrig.write(chunk, encoding, function() {
            console.log('Finished writing')
            callback && callback()
        })
    }

    LoggingWritable.prototype.on = function() {
        return this.writableOrig.on.apply(this.writableOrig, arguments)
    }

    LoggingWritable.prototype.end = function() {
        return this.writableOrig.end.apply(this.writableOrig, arguments)
    }

    return new LoggingWritable(writableOrig)
}


let writableProxy = createLoggingWritable(writable)
writableProxy.write('My goodness')
writableProxy.write('How is the sky treating you?')
writableProxy.write('Are you alright?')


writableProxy.on('finish', 
    () => console.log('I am done'))

writableProxy.end()