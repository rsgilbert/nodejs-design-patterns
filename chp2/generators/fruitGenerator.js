function* fruitGenerator() {
    yield 'apple'
    yield 'orange'
    return 'posho'
    yield 'watermelon'
}


const newFruitGenerator = fruitGenerator()
console.log(newFruitGenerator.next())
console.log(newFruitGenerator.next())
console.log(newFruitGenerator.next())
console.log(newFruitGenerator.next())