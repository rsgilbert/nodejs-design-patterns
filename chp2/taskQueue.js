// NDP pg 79
// Limit running tasks using queues

function TaskQueue(concurrency) {
    this.concurrency = concurrency;
    this.running = 0
    this.queue = []
}


// Adds a new task to the queue and then bootstraps the execution
// of the worker by invoking this.next()
TaskQueue.prototype.pushTask = function pushTask(task) {
    this.queue.push(task)
    this.next()
}


TaskQueue.prototype.next = function next() {
    const self = this 
    while(self.running < self.concurrency && self.queue.length) {
        // Remove first task from queue
        const task = self.queue.shift()
        self.running ++
        task(err => {
            self.running --;
            self.next()
        })
    }
    // console.log(`${self.running} running, ${self.queue.length} in queue`)
}


module.exports = TaskQueue