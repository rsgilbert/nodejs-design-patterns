exports.loaded = false 
let b = require('./b')

module.exports = {
    bWasLoaded: b.loaded,
    loaded: true
}