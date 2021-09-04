const fs = require('fs')
const cache = {
    // if below property is already already there the corresponding 
    // listener wont be called in time
    './unpredictable.js': 'kk' 
}


// Dangerous because it behaves asynchronously when the
// data for a file is read for the first time
// and behaves synchronously for subsequent requests
// on the same fileName, that is, triggers an immediate invocation of
// the callback
function inconsistentRead(name, fileName, callback) {
   console.log(name, cache)
    if(cache[fileName]) {
        console.log('reading from cache')
        // invoke synchronously
        // Called right away
        // callback(cache[fileName])

        // Defer execution
        // Schedule callback invocation to be executed in the future
        // This will make inconsistentRead fully asynchronous

        setImmediate(() => console.log('immediate'))
        process.nextTick(() => {
            callback(cache[fileName])
        })
        console.log('callback deferred')
    } else {
        // asynchronous function
        // Called after all synchronous code is done executing
        fs.readFile(fileName, 'utf8', (err, data) => {
            cache[fileName] = data
            //console.log('here: ', cache)
            callback(data)
        })
    }
}

// Case in point
function createFileReader(name, fileName) {
    const listeners = []
    inconsistentRead(name, fileName, (value) => {
        console.log('calling listeners for ' + name)
        listeners.forEach(listener => 
            listener(value)
        )
    })
    
    return {
        // We are registerering the listeners after the creation of the reader.
        // For asynchronous versions we'll have time before the invokation
        // For synchronous versions, the listeners will be called before we had time
        // to register them. Therefore they will never be invoked.
        //
        // listener is a function that takes an argument called value 
        // which is the data read from the file.
        onDataReady: listener => {
            console.log('setting up listener for ' + name)
            listeners.push(listener)
        }
    }
}


const reader = createFileReader('r1', './unpredictable.js')
reader.onDataReady(value => {
    console.log('r1 listener 1:', value.length)
})

reader.onDataReady(value => {
    console.log('r1 listener 2:', value.length)
})


// second reader
const reader2 = createFileReader('r2', './unpredictable.js')
reader2.onDataReady(value => {
    console.log('r2 listener 1:', value.length)
})

reader2.onDataReady(value => {
    console.log('r2 listener 2:', value.length)
})

