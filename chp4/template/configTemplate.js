// Using the template pattern to implement
// a configuration manager for saving and 
// loading a set of configuration properties
// using different file formats.

const fs = require('fs')
const objectPath = require('object-path')
const util = require('util')


function ConfigTemplate() {
    this.data = {}
}

ConfigTemplate.prototype.read = function(file) {
    console.log('Deserializing from', file)
    this.data = this._deserialize(fs.readFileSync(file, 'utf8'))
}

ConfigTemplate.prototype.save = function(file) {
    console.log('Serializing to', file)
    fs.writeFileSync(file, this._serialize(this.data))
}

ConfigTemplate.prototype.get = function(path) {
    return objectPath.get(this.data, path)
}

ConfigTemplate.prototype.set = function(path, value) {
    return objectPath.set(this.data, path, value)
}

// We can not declare a method as abstract, so we
// simply define them as stubs, throwing an exception
// if invoked.
ConfigTemplate.prototype._serialize = function() {
    throw new Error('_serialize() must be implemented')
}

ConfigTemplate.prototype._deserialize = function() {
    throw new Error('_deserialize() must be implemented')
}

module.exports = ConfigTemplate   


// Define concrete classes
// This is where we implement the template methods
// for json
function JsonConfig() {
    ConfigTemplate.call(this)
}

util.inherits(JsonConfig, ConfigTemplate)

JsonConfig.prototype._deserialize = function(data) {
    return JSON.parse(data)
}

JsonConfig.prototype._serialize = function(data) {
    return JSON.stringify(data)
}

module.exports.JsonConfig = JsonConfig
