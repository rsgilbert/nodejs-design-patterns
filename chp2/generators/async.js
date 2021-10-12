const fs = require('fs')
const path = require('path')

function asyncFlow(generatorFunction) {
    function callback(err) {
        if(err) {
            return generator.throw(err)
        }
        const results = [].slice.call(arguments, 1)
        generator.next(results.length > 1 ? results : results[0])
    }
    const generator = generatorFunction(callback)
    generator.next()
}

// A function that creates a clone of itself
asyncFlow(function* (callback) {
    const filename = path.basename(__filename)
    // Below, the code will pause at the yield until
    // resumed by the generator.next call, but this next
    // call is made from the callback. So the code will therefore
    // pause execution until the asynchronous task completes
    const myself = yield fs.readFile(filename, 'utf8', callback)
    yield fs.writeFile('clone_of_' + filename, myself, callback)
    console.log('clone created')
})


// Thunk example
// A function that partially applies all the arguments
// of the original function except its function. The return
// value of a thunk is another function that accepts only the
// callback as an argument.
function readFileThunk(filename, options) {
    return function(callback) {
        fs.readFile(filename, options, callback)
    }
}