// Implementing a proxy using an object
// literal and a factory
function createProxy(subject) {
    return {
        // Proxied method
        hello: function(){ 
            return subject.hello() + ', from proxy'
        },

        // Delegated method
        goodbye: function() {
            return subject.goodbye(...arguments)
        }
    }
}

// create subject
const pie = {
    hello() { return 'Hello Word' },
    goodbye() { return console.log('Goodbye dear') }
}

// create proxy
const pieProxy = createProxy(pie)

console.log(pieProxy.hello())
pieProxy.goodbye()
