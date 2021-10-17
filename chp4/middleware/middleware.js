// Middlewares to be used

// Middleware that acts like a filter that
// serializes and deserializes JSON messages
const jsonMiddleware = function() {
    return { 
        // Deserializes the data in message received as input
        inbound: function(message, next) {
            message.data = JSON.parse(message.data.toString())
            next()
        },
        // Serializes the data in message.
        outbound: function(message, next) {
            message.data = Buffer.from(JSON.stringify(message.data))
            next()
        }
    }
}


module.exports.jsonMiddleware = jsonMiddleware
