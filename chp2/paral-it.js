// Pattern: Parallel execution

// Run a set of asynchronous tasks in parallel by spawning them all at once
// and then wait for all of them to complete by counting the number of 
// times their callbacks are invoked

// To generalize the solution, we create a function with 
// this signature:
function parallelIterateSeries(collection, iteratorCallback, finalCallback) {
    let completedCount = 0
    let errored = false

    function done(err) {
        if(err) {
            errored = true
            return finalCallback(err)
        }
        if(++completedCount === collection.length && !errored) {
            return finalCallback(null)
        }
    }

    for(let index = 0; index < collection.length; index++) {
        iteratorCallback(collection[index], done)
    }
 }


// Usage of iterateSeries
parallelIterateSeries(
    [1, 2, 3, 4, 5], 
    // iterator callback
    (item, done) => {
        console.log('working on', item)
        setTimeout(() => {
            console.log('Item is', item)
            if(item === 3) return done(Error('3 encountered'))
            done()
        }, 2000)
    },
    // final callback
    (err) => {
        if(err) {
            return console.log('Error ->', err)
        }
        console.log('finished iterating series')
    }
)

