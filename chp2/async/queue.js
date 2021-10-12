// Parallel globally limited execution using async.queue

const async = require('async')


const q = async.queue(
    // worker
    (task, callback) => {
        setTimeout(() => {
            task()
            // Calling callback signifies that we can now add more 
            // tasks to the queue
           callback()
        }, 1000)
    }, 
    // concurrency
    2)

q.push(() => {
     console.log('first task')
})

q.push(() => {
    console.log('second task')
})
q.push(() => {
    console.log('third task')
})

q.push(() => {
   console.log('fourth task')
})
q.push(() => {
    console.log('fifth task')
})

q.push(() => {
   console.log('sixth task')
})