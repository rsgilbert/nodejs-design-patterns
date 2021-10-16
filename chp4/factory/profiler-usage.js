// Using Profiler object in a sample program
// Execute like this:
// export NODE_ENV=development; node profiler-usage

const profilerFactory = require('./profiler')

function getName() {
    // The profiler variable contains the instance 
    // of our Profiler object but we dont know how
    // its created or what its implementation is at
    // this point in the code.
    const profiler = profilerFactory('JEV')
    console.log(profiler)
    profiler.start()
    setTimeout(() => {
        console.log('timed out')
        profiler.end()
        console.log('name is Simon')
    }, 600)
}

getName()
console.log('Done')