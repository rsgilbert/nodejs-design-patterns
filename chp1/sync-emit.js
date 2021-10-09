const { EventEmitter } = require('events')
const util = require('util')

function SyncEmit() {
    // this.emit('ready')
    process.nextTick(() => {
        // emit asynchronously
        this.emit('ready')
    })
}

util.inherits(SyncEmit, EventEmitter)

const syncEmit = new SyncEmit();

syncEmit.on('ready', () => {
    console.log('sync emit is ready')
})

// Emit after registering a listener
syncEmit.emit('ready')