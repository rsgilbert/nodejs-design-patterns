// This module implements the OnlineState strategy

function OnlineState(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
}

module.exports = OnlineState;

// We write the data received directly to the socket
OnlineState.prototype.send = function(data) {
    console.log('Sending data directly to socket', data);
    this.failsafeSocket.socket.write(data)
}

OnlineState.prototype.activate = function() {
    const self = this;
    console.log('flushing queue', self.failsafeSocket.queue)
    self.failsafeSocket.queue.forEach(function(data) {
        self.failsafeSocket.socket.write(data)
    })
    self.failsafeSocket.queue = []
    self.failsafeSocket.socket.once('error', function() {
        console.log('Going offline')
        self.failsafeSocket.changeState('offline')
    })
}