// direct style
function addDS(a, b) {
    return a + b
}

// equivalent continuous passing style
function addCPS(a, b, callback) {
    const result = a + b
    callback(result)
}


// testing cps
// console.log('before')
// addCPS(1, 2, result => {
//     console.log('Result', result)
// })

// console.log('after')

function addAsync(a, b, callback) {
    setTimeout(() => {
        callback(a+b)
    }, 100)
}

console.log('before')
addAsync(2, 3, result => {
    console.log('result', result)
})
console.log('after')











