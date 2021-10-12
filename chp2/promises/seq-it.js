// Pattern: Sequential iteration with promises
// Dynamically builds a chain of promises using a loop


const tasks = [
    () => Promise.resolve(5),
    () => Promise.resolve(3),
    () => Promise.resolve(13)
]

let promise = Promise.resolve(0)

let sum  = 0

tasks.forEach(task => {
    promise = promise.then(v => {
        console.log('value is', v)
        sum += v
        console.log('now sum is', sum)
        return task()
    })
})


promise.then(v => {
    console.log('last v is', v)
    sum += v
    console.log('sum is', sum)
})

