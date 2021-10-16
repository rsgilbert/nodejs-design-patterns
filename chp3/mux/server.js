const net = require('net')
const fs = require('fs')

// Demultiplexing of our "little" protocol
function demultiplexChannel(source, destinations) {
    let currentChannel = null 
    let currentLength = null 

    source 
        .on('readable', function() {
            let chunk 
            // Get channelID
            if(currentChannel === null) {
                chunk = this.read(1)
                currentChannel = chunk && chunk.readUInt8(0)
            }
            console.log('** Channel:', currentChannel)
            

            // Get channel length
            if(currentLength === null) {
                chunk = this.read(4)
                currentLength = chunk && chunk.readUInt32BE(0)
                console.log('Length:', currentLength)
                if(currentLength === null) {
                    // Next operation relies on currentLength
                    // If we dont have currentLength we have to stop here
                    return 
                }
            }

            // Get data
            chunk = this.read(currentLength);
            console.log('Chunk:', chunk.toString(), '\n*****')
            if(chunk == null) {
                return
            }
            destinations[currentChannel].write(chunk)
            currentChannel = null 
            currentLength = null 
        })
        .on('end', function() {
            destinations.forEach(function(destination) {
                destination.end()
            })
            console.log('Source channel closed')
        })
}

// We start a TCP server on port 3000
// For each connection we receive we create two writable streams
// pointing to two log files for each our our two destination channels
function createServer() {
    let port = 3000
    net.createServer(function(socket) {
        console.log('creating server for socket at ', socket.localAddress, socket.localPort)
        const stdoutStream = fs.createWriteStream('./stdout.log')
        const stderrStream = fs.createWriteStream('./stderr.log')
        let destinations = [stdoutStream, stderrStream]
        demultiplexChannel(socket, destinations)
    })
    .listen(port, function() {
        console.log('Server started')
    })
}

createServer()