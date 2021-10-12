function* iteratorGenerator(arr) {
    for(let i = 0; i < arr.length; i++) {
        yield arr[i]
    }
}

const iterator = iteratorGenerator(['pie', 'chocolate', 'strawberry'])
let currentItem = iterator.next()
// while(!currentItem.done) {
//     console.log('currentItem', currentItem.value)
//     currentItem = iterator.next()
// }

// Passing values back to a generator
function* twoWayGenerator() {
    console.log('started')
    try {
        const what = yield 5 
        console.log('hello', what)
    } 
    catch(e) {
        console.log('some error there')
    }
}

const twoWay = twoWayGenerator()
console.log(twoWay.next())

// We pass in a value to go back to the generator
// console.log(twoWay.next(11))

// Make generator throw exception
twoWay.throw(new Error('failure'))
