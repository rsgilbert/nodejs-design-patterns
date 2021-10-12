// Execute a collection of asynchronous tasks in series

const async = require('async')

const tasks =     [
    () => console.log('task 1 done in 1000ms'),
    () => console.log('task 2 done in 500ms'),
    () => console.log('task 3 done in 2s'),
    () => console.log('task 4 done in 1ms')
]


// // Each series allows you to specify an iterator for each task
async.eachSeries(tasks, (task, done) => {
    console.log('task started')
    setTimeout(() => {
        task()
        done()
    }, 1000)
}, (e) => {
    if(e) {
        return console.log('error', e)
    }
    console.log('finished all')
})


// Perform unlimited parallel execution
// async.each 
// async.each(tasks, (task, done) => {
//     console.log('task started')
//     setTimeout(() => {
//         task()
//         done()
//     }, 2000)
// }, (e) => {
//     if(e) {
//         return console.log('error', e)
//     }
//     console.log('finished all')
// })