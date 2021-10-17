// Decorator is a structural pattern that consists of 
// dynamically augmenting the behaviour of an existing object.

// Implementing a decorator using composition.
// The decorated object is wrapped around a new 
// object that usually inherits from it.

function decorate(component) {
    const proto = Object.getPrototypeOf(component)

    function Decorator(component) {
        this.component = component;
    }

    Decorator.prototype = Object.create(proto)

    // new method
    Decorator.prototype.greetings = function() {
        console.log('Greetings dear')
    }

    // Delegated method
    Decorator.prototype.hello = function() {
        return this.component.hello(...arguments)
    }

    return new Decorator(component)
}


const merry = {
    hello() {
        console.log('Hello')
    }
}

const decoratedMerry = decorate(merry)
decoratedMerry.hello()
decoratedMerry.greetings()