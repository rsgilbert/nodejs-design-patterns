console.log(exports)
console.log(module.exports)
console.log(exports === module.exports)

// exports = { a: 3}
exports.a = 3

console.log(exports)
console.log(module.exports)
console.log(exports === module.exports)

console.log(module)