// Factory that when invoked returns the new generator object
function* makeGenerator() {
    yield 'Hello World'
    console.log('reentered')
}

const gen = makeGenerator()