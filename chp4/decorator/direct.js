// Decoration can also be achieved by simply
// attaching new methods directly to an 
// existing object.
// This is called object augmentation / monkey patching
// Please note that this mutates the 
// existing object

function decorate(component) {
    component.greetings = function() {
        console.log('I greet you')
    }
    return component
}

const a = { hello() { console.log('Hi') }}

const decoratedA = decorate(a)
decoratedA.hello()
decoratedA.greetings()