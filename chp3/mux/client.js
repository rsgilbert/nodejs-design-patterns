// This is the part of the application that
// is responsible for starting a child process
// and multiplexing its streams


const child_process = require('child_process')
const net = require('net')
const path = require('path')



// A function that performs multiplexing of a list of
// sources

function multiplexChannels(sources, destination) {
    let totalChannels = sources.length

    for(let i = 0; i < sources.length; i++) {
        sources[i]
            .on('readable', function(i) {
                // When chunk is ready we wrap it into a packet 
                // that contains the channel ID, packet size and 
                // the actual data and then write the packet to the
                // destination stream
                let chunk 
                while((chunk = this.read()) !== null) {
                    let outBuff = new Buffer(1 + 4 + chunk.length);
                    outBuff.writeUInt8(i, 0)
                    outBuff.writeUInt32BE(chunk.length, 1);
                    chunk.copy(outBuff, 1 + 4)
                    console.log('Sending packet', chunk.toString(), 'to channel', i)
                    destination.write(outBuff)
                }
            }.bind(sources[i], i))
            .on('end', () => {
                // When this source ends we decrement totalChannels
                // If there is no more source channel we end the
                // destination stream
                if(--totalChannels === 0) {
                    destination.end()
                }
            })
    }
}


// Create a socket that will act as a client for our
// demultiplexer server in ./server.js
// It also runs another javascript file, a module
// The output of running that module is sent to the 
// destination over the socket
function createSocket() {
    // Technical documentation
    // We create a TCP client connection to the address localhost:3000.
    // And then we start the child process
    // We specify { silent: true } so that the child process
    // does not inherit stdout and stderr of the parent
    // We then multiplex stdout and stderr of child into socket
    let modulePath = 'generateData.js'
    let args = []
    let port = 3000
    const socket = net.connect(port, function() {
        const child = child_process.fork(
            modulePath, args, { silent: true }
        )
        multiplexChannels([child.stdout, child.stderr], socket)
    })
    return socket
}

createSocket()