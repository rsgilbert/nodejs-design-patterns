// Implementing a proxy using composition.
// We have to intercept the methods we are interested 
// in manipulating (eg hello()) while simply delegating 
// the rest to the subject.

// Implementing proxy using pseudo-classical inheritance and a factory
function createProxyUsingInheritance(subject) {
    const proto = Object.getPrototypeOf(subject)
    
    function Proxy(subject) {
        this.subject = subject;
    }

    Proxy.prototype = Object.create(proto) 

    // Proxied method
    Proxy.prototype.hello = function() {
        return this.subject.hello() + ' world'
    }

    // Delegated method
    Proxy.prototype.goodbye = function() {
        return this.subject.goodbye(...arguments)
    }

    const p = new Proxy(subject)
    return p
}

module.exports.createProxyUsingInheritance = createProxyUsingInheritance