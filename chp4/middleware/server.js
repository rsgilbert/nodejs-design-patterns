// Install pplatform/native dependencies using:
// pip install git+https://chromium.googlesource.com/external/gyp
// sudo apt-get install libzmq3-dev
// See: https://zeromq.org/download/
// See: https://stackoverflow.com/questions/40025591/the-gyp-0-1-distribution-was-not-found
const zmq = require('zeromq')
const ZmqMiddlewareManager = require('./zmqMiddlewareManager')
const middleware = require('./middleware')


// Bind zeromq reply socket to a local port
const reply = new zmq.socket('rep')
reply.bind('tcp://127.0.0.1:5000')

// Initialize our middleware manager
const zmqm = new ZmqMiddlewareManager(reply)
zmqm.use(middleware.jsonMiddleware())

// Add another middleware to handle the request
zmqm.use({ 
    inbound: function(message, next) {
        console.log('Received', message)
        if(message.data.action === 'ping') {
            console.log({ action: 'pong', echo: message.data.echo })
            this.send({ action: 'pong', echo: message.data.echo })
        }
        else { 
            // You need to always send back a response else 
            // the communication will hang and the server may stop 
            // showing further logs. (Dont know why)
            this.send({ action: 'response', echo: 'Done' })
        }
        next()
    },
    outbound: function(message, next) {
        console.log('out', message.data.toString())
        next()
        // if(message.data.action === 'ping') {
        //     // console.log({ action: 'pong', echo: message.data.echo })
        //     // this.send({ action: 'pong', echo: message.data.echo })
        // }
        // next()
    }
    // We did not define outbound function becuase we are the server
})