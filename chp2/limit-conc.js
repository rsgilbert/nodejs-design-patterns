const { second } = require('./utilities')

let tasks = [second, second, second, second, second, second]
let concurrency = 2, running = 0, completed = 0, index = 0;

function next() {
    while(running < concurrency && index < tasks.length) {
        let task = tasks[index++];
        console.log(`${running} running, ${completed} completed`)
        task(function() {
            if(completed === tasks.length) {
                return finish()
            }
            completed++, running--;
            next();
        })
        // One more task running
        running++;
    }
    console.log(`out of while loop with ${running} running and ${completed} completed`)
}

next()

function finish() {
    console.log('finished all tasks')
}