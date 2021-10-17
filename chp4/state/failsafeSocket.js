const OfflineState = require('./offlineState')
const OnlineState = require('./onlineState')

// An application of the State pattern.
// We have different states and each state
// uses a different strategy for sending data.
// When the state changes it triggers a change in
// the strategy we are using to send data.
function FailsafeSocket(options) {
    this.options = options;
    this.queue = []
    this.currentState = null;
    this.socket = null;
    this.states = {
        offline: new OfflineState(this),
        online: new OnlineState(this)
    }
    this.changeState('offline')
}

// This is where we change the current strategy based 
// on a change in the state
FailsafeSocket.prototype.changeState = 
    function(newState) {
    console.log('Changing state to', newState)
    this.currentState = this.states[newState]
    this.currentState.activate()
}

FailsafeSocket.prototype.send = 
    function(data) {
    this.currentState.send(data)
}


function createFailsafeSocket(options) {
    return new FailsafeSocket(options)
}

module.exports = createFailsafeSocket