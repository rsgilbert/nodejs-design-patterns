const Counter = require('./callback-eventemitter')


const counter = new Counter(15 * 1000)

// register listeners
counter.on('checkpoint', v => {
    console.log('checkpoint at', v)
})

counter.on('end', () => console.log('Ended'))


counter.count(() => console.log('Finished counting'))