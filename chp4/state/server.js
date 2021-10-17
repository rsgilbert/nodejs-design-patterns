const jot = require('json-over-tcp')


const server = jot.createServer({ port: 5000 })

server.on('connection', function(socket) {
    socket.on('data', function(data) {
        console.log('Received data of type', typeof data)
        console.log(data)
    })
})

server.listen(5000, _ => console.log('Started'))
