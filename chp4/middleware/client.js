const zmq = require('zeromq')
const ZmqMiddlewareManager = require('./zmqMiddlewareManager')

const middleware = require('./middleware')

const request = new zmq.Socket('req')
request.connect('tcp://127.0.0.1:5000')


// Setup middleware framework using our middleware manager
const zmqm = new ZmqMiddlewareManager(request)
zmqm.use(middleware.jsonMiddleware())

// Setup an inbound middleware to handle responses from server
zmqm.use({ 
    inbound: function(message, next) {
        console.log('Echoed back', message)
        next()
    },
    outbound: function(message, next) {
        console.log(' outbound', JSON.stringify(message))
        next()
    }
})

// Send single message
zmqm.send({ action: 'laugh' })
zmqm.send({ action: 'cry' })
// Setup a timer to send some ping requests at regular
// intervals.
// Use zmqMiddlewareManager to get all the advantages our middleware
setInterval(function() {
    zmqm.send({ action: 'ping' /*, echo: Date.now() */ })
}, 1000)







