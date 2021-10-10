// Pattern: Sequential iterator
// Execute a list of tasks in a sequence by creating
// a function named iterator which invokes the next available
// task in the collection and makes sure to invoke the next
// step of the iteration when the current task completes.

// To generalize the solution, we create a function with 
// this signature:
function iterateSeries(collection, iteratorCallback, finalCallback) {
    parallelterateSeriesRecursive(collection, iteratorCallback, finalCallback, 0)
}

function parallelterateSeriesRecursive(collection, iteratorCallback, finalCallback, index) {
    if(index === collection.length) {
        return finalCallback()
    }
    const item = collection[index]
    iteratorCallback(item, () => 
        parallelterateSeriesRecursive(collection, iteratorCallback, finalCallback, index + 1)
    )
}


// Usage of iterateSeries
iterateSeries(
    [1, 2, 3, 4, 5], 
    (item, callback) => {
        setTimeout(() => {
            console.log('Item is', item)
            callback()
        }, 2000)
    },
    () => console.log('finished iterating series')
)


// Iterate over a sequence while applying an 
// asynchronous operation.
// We use recursion programming model but its
// NOT recursive if we are calling the same
// function asynchronously.
function processTimeouts()  {
    const timeout = callback => setTimeout(callback, 3000)
    let tasks = [timeout, timeout, timeout, timeout]

    function iterate(index) {
        if(tasks.length === index) {
            return finish()
        }

        let task = tasks[index]
        task(() => {
            console.log('Processed task', index)
            // Because task is asynchronous, the iterate call
            // below is not recursive. We'll not hit the 
            // maximum call stack size limit
            iterate(index + 1)
        })
    }

    function finish() {
        console.log("procesing timeouts is complete")
    }

    iterate(0)
}


// processTimeouts()