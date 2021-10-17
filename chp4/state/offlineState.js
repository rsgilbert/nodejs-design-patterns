const jot = require('json-over-tcp')

// Strategy for managing the behavior of the 
// socket while it's offline
function OfflineState(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
}

module.exports = OfflineState 

// Function for queueing any data that is received
OfflineState.prototype.send = function(data) {
    console.log('queing data', data)
    this.failsafeSocket.queue.push(data)
    console.log('Queue is now', this.failsafeSocket.queue)
}

// The activate function keeps trying to establish a 
// connection periodically. Once a connection is 
// established we change the state of failsafeSocket to "online"
OfflineState.prototype.activate = function(data) {
    const self = this;
    function retry() {
        setTimeout(function() {
            console.log('trying again...')
            self.activate()
        }, 500)
    }

    self.failsafeSocket.socket = jot.connect(
        self.failsafeSocket.options,
        function() {
            self.failsafeSocket.socket.removeListener('error', retry)
            self.failsafeSocket.changeState('online')
        }
    );

    self.failsafeSocket.socket.once('error', retry)
}








