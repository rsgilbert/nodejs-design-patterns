const ini = require('ini')

// A strategy for serializing json data
module.exports.json = {
    deserialize: function(data) {
        return JSON.parse(data)
    },

    serialize: function(data) {
        return JSON.stringify(data, null, ' ')
    }
}


// config strategy that uses ini file format
// to serialize and deserialize data
module.exports.ini = {
    deserialize: function(data) {
        return ini.parse(data)
    },

    serialize: function(data) {
        return ini.stringify(data)
    }
}