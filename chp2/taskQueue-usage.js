const TaskQueue = require('./taskQueue')
const { second } = require('./utilities')

const mySec = callback => {
    second(() => {
        console.log('1 second timeout complete')
        // callback takes an error parameter
        callback(null)
    })
}

// Process multiple tasks with a limit on how
// many concurrent tasks you process at a time

const taskQueue = new TaskQueue(3)

taskQueue.pushTask(mySec)
taskQueue.pushTask(mySec)
taskQueue.pushTask(mySec)
taskQueue.pushTask(mySec)
taskQueue.pushTask(mySec)
taskQueue.pushTask(mySec)
taskQueue.pushTask(mySec)
taskQueue.pushTask(mySec)
taskQueue.pushTask(mySec)

