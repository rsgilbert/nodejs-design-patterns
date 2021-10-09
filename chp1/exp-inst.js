// We can leverage the caching mechanisms of require() to easily 
// define stateful instances - objects with a state created from a constructor 
// or a factory which can be shared across modules

function Logger(name) {
    this.count = 0;
    this.name = name 
}

Logger.prototype.log = function(message) {
    this.count ++;
    console.log(`${this.name} [${this.count}]: ${message}`)
}

module.exports = new Logger('DEFAULT')

// Extension of export instance pattern
// We expose the constructor used to create the instance inaddition to 
// the instance itself
module.exports.Logger = Logger 