// NDP pg 42

// Substack pattern
/*
A module definition pattern that consists of reassigning the
whole module.exports variable to a function. Its main strength is
the fact that it exposes only a single functionality thus providing a
single entry point for the module which makes the module simple to 
understand and use.
*/

module.exports = function(message) {
    console.log('Message:', message)
}

// We can also use the exported function as a namespace for other secondary
// or more advanced functionalities
module.exports.verbose = function(message) {
    console.log('Verbose:', message)
}