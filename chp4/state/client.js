const createFailSafeSocket = require('./failsafeSocket')

const failsafeSocket = createFailSafeSocket({ port: 5000 })

setInterval(function() {
    // send current memory usage
    failsafeSocket.send(process.memoryUsage())
}, 1000)