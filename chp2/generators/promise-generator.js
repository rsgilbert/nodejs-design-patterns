// Combine promises with generators to write asynchronous code
// as if you're writing synchronous code. ie in linear fashion
function asyncProm(generatorFunction) {
    const generator = generatorFunction()
    const p = generator.next().value
    p.then(
        value => generator.next(value),
        err => generator.throw(err)
    )
}

asyncProm(function* () {
    const result = yield Promise.resolve(5)
    console.log('result is', result)
})

asyncProm(function* () {
    try {
        // yield indicates that the code is going to pause at this point
        const prV = yield new Promise((res, rej) => {
            rej(Error('bad boy'))
        })
        console.log('promise value', prV)
    } 
    catch(e) {
        console.log('error encountered', e)
    }
})