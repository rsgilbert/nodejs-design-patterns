// Object augmentation, also called monkey patching
// Proxy individual methods of an object by 
// modifying the subject directly replacing a method
// with its proxied implementation

function createProxy(subject) {
    let helloOrig = subject.hello 
    subject.hello = function() {
        return helloOrig(...arguments) + 'world'
    }
    return subject
}


let s = { hello() { return 'Hi'} }

let sProxy = createProxy(s)

console.log(sProxy.hello())


