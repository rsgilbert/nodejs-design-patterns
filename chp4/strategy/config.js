const fs = require('fs')
const objectPath = require('object-path')


function Config(strategy) {
    this.data = {}
    this.strategy = strategy
}


Config.prototype.get = function(path) {
    return objectPath.get(this.data, path)
}

Config.prototype.set = function(path, value) {
    return objectPath.set(this.data, path, value)
} 

// Get data from file and put it into this.data
Config.prototype.read = function(file) {
    console.log('deserializing from', file)
    this.data = this.strategy.deserialize(fs.readFileSync(file, 'utf8'))
}

// Save this.data to file
Config.prototype.save = function(file) {
    console.log('Serializing to', file)
    fs.writeFileSync(file, this.strategy.serialize(this.data))
}

// Export factory for creating Config object
function createConfig(strategy) {
    return new Config(strategy)
}

module.exports = createConfig

// Export Config constructor as an auxillary property
module.exports.Config = Config

