// async.series takes a series of tasks and a callback
// function that is invoked once all the tasks are complete
const async = require('async')
const { second } = require('../utilities')

// Done callback is important so we run
// code that should run once the task is complete
const mySec = (id) => (done) => second(() => {
    console.log('completed task', id)
    done()
})

const tasks = [mySec(1), mySec(2), mySec(3), mySec(4)]


// async.series(tasks, (err) => {
//     if(err) {
//         return console.log("error", err)
//     }
//     console.log("completed all tasks")
// })

// The asynchronous tasks are executed one after another sequentially
async.series(
    [
        (done) => setTimeout(() => { console.log('task 1 done in 1000ms'); done() }, 1000),
        (done) => setTimeout(() => { console.log('task 2 done in 500ms'); done(Error('failed'))}, 500),
        (done) => setTimeout(() => { console.log('task 3 done in 2s'); done() }, 2000),
        (done) => setTimeout(() => { console.log('task 4 done in 1ms'); done()}, 1),
    ],
    err => {
        if(err) return console.log(err)
        console.log('finished all tasks')
    }
)

