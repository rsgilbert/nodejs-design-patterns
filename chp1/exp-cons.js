// export constructor
// A module that exports a constructor is a specialization of a
// module that exports a function 

// file logger 
function Logger(name) {
    // Variation of this export constructor pattern
    // Apply a guard against invocations that don't use the
    // new instruction. This trick allows us to use our module
    // as a factory
    if(! (this instanceof Logger)) {
        return new Logger(name)
    }
    console.log('this is', this)
    this.name = name 
}

Logger.prototype.log = function(message) {
    console.log(`[${this.name}] ${message}`)
}

Logger.prototype.info = function(message) {
    console.log(`info: ${message}`)
}

Logger.prototype.verbose = function(message) {
    console.log(`verbose: ${message}`)
}

module.exports = Logger