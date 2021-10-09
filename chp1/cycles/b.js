exports.loaded = false 

let a = require('./a')
module.exports = {
    aWasLoaded: a.loaded,
    loaded: true
}