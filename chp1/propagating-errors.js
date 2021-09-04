const fs = require('fs')

function readJSON(filename, callback) {
    fs.readFile(filename, 'utf-8', function(err, data) {
        let parsed;
        if(err) {
            return callback(err)
        }
        try {
            parsed = JSON.parse(data)
        } 
        catch(err) {
            return callback(err)
        }
        callback(null, data)
    })
}

function readJSON_NoTryCatch(filename, callback) {
    fs.readFile(filename, 'utf-8', function(err, data) {
        if(err) {
            return callback(err)
        }
        // uncaught parsing error
        const parsed = JSON.parse(data)
        return callback(null, parsed)
    })
}


// This try-catch will run and complete before the
// event is handled. When the event is handled, because
// we did not put a try-catch in the handler, the error
// will be thrown into the event loop which in turn will
// throw it to stderr
try {
    readJSON_NoTryCatch('./cps.js', 'utf-8', function(err, data) {
        if(err) {
            console.error('Got an error', err)
        }
        console.log('data is data')
    })
} 
catch(err) {
    console.log('err in readJSON_NoTryCatch', err)
}


// readJSON('./cps.js', (err, data) => {
//     if(err) {
//         console.error('Got an error', err)
//     }
//     console.log('data is data')
// })


// Nodejs emits a special event before exiting the process
// when an exception reaches the event loop
// If a handler is defined for this event, nodejs wont 
// automatically exist.

process.on('uncaughtException', function(err) {
    console.error('Last stand:', err)

    // Its advisable to proceed to terminate
    // because the uncaught exception leaves the application
    // in a state not guaranteed to be consistent
    process.exit(1)
})

// timeout to check if the application is still running 
// after uncaught exception

setTimeout(() => {
    console.log('Still here')
}, 100)