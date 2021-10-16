// We can create objects in any way we like inside the factory function.
// And we can execute additional initialization steps or return a
// different object based on particular conditions.
// We do all this while isolating the consumer of the object 
// from all these details.


// We use the default high resolution timer to save
// the current time when start() is invoked and then
// calculate the elapsed time when end() is executed.
// We log the elapsed time to the console.
function Profiler(label) {
    this.label = label
    this.lastTime = null 
}

Profiler.prototype.start = function() {
    this.lastTime = process.hrtime();
    console.log('last time', this.lastTime)
}

Profiler.prototype.end = function() {
    const diff = process.hrtime(this.lastTime)
    console.log(diff)
    console.log('Timer"', this.label, '" took', diff[0], 'seconds and',
        diff[1], 'nanoseconds')   
}

// Factory for creating a Profiler object
// The profiler we get depends on the NODE_ENV we are using.
function profilerFactory(label) {
    console.log(process.env.NODE_ENV)
    if(process.env.NODE_ENV === 'development') {
        return new Profiler(label)
    }
    if(process.env.NODE_ENV === 'production') {
        return {
            start(){},
            end() {}
        }
    }
    throw new Error('Unknown NODE_ENV ' + process.env.NODE_ENV)
}

module.exports = profilerFactory