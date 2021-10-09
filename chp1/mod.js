const mod = (function() {
    var privateFoo = function() {
        console.log('private')
    }
    var priv = 12;
    var publicFoo = function() {
        console.log('public')
    }
    var pub = 29

    var myExport = {
        publicFoo,
        pub
    }
    return myExport
})()

console.log(mod)
mod.publicFoo()