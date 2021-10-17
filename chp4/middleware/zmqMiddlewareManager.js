// Building a middleware infrastructure
// around zeromq. 
// Here we create a component that is responsible
// for executing the middleware pipeline when 
// a new message is received or sent.

// Defines constructor for our middleware manager
function ZmqMiddlewareManager(socket) {
    this.socket = socket;
    // for inbound messages
    this.inboundMiddleware = []
    // for outbound messages
    this.outboundMiddleware = []
    let self = this 

    // Immediately start listening for new 
    // messages coming from the socket.
    socket.on('message', function(data) {
        const message = { data }
        // console.log('message is', message)
        self.executeMiddleware(self.inboundMiddleware, message)
    })
}

module.exports = ZmqMiddlewareManager


// Executes the middleware when a message is sent through
// the socket
ZmqMiddlewareManager.prototype.send = function(data) {
    const self = this;
    const message = { data }
    // Process message using filters in the outboundMiddleware
    // and then pass its data to socket.send() during the
    // callback for the actual network transmission
    self.executeMiddleware(self.outboundMiddleware, message,
        function() {
        self.socket.send(message.data)
    })
}


// Method for appending new middleware functions to the 
// middleware pipeline.
// Each middleware can consist of inbound and outbound functions
ZmqMiddlewareManager.prototype.use = function(middleware) {
    // Notice that the inpbound middleware is pushed to 
    // the end of inboundMiddleware list and outbound is inserted at the beginning
    // of outboundMiddleware list.
    // This is because complementary inbound/outbound middleware
    // needs to be executed in an inverted order. 
    // If the last thing we did before sending was compressing the data
    // then the first thing we do on receiving the data is decompressing.
    if(middleware.inbound) {
        // Put to the end of the list
        this.inboundMiddleware.push(middleware.inbound)
    }
    if(middleware.outbound) {
        // Put to the start of the list
        this.outboundMiddleware.push(middleware.outbound)
    }
}


// Function responsible for executing the middleware
ZmqMiddlewareManager.prototype.executeMiddleware = 
    function(middleware, arg, finish) {
    const self = this;
    (function iterator(index) {
        if(index === middleware.length) {
            console.log('finished')
            return finish && finish()
        }
        console.log('NOt finished')
        middleware[index].call(self, arg, function(err) {
            if(err) {
                console.log('There was an error', err.message)
            }
            // console.log('ran middleware with number', index)
            iterator(++index)
        })
    })(0)
}