const fs = require("fs");
const path = require('path')

function loadModule(filename, module, require){
    const wrappedSrc = 
    '(function(module, exports, require) {' +
    fs.readFileSync(filename, 'utf-8') +
    '})(module, module.exports, require);'
    eval(wrappedSrc)
}

/**
 * The following function simulates the behavior of the original
 * require() function of Node.js which is used to load a module.
 * @param {*} moduleName 
 */
require = function(moduleName) {
    console.log('Require invoked for module: ' + moduleName)

    // Resolve full path of the module. We call this path "id"
    // This task is delegated to require.resolve function
    const id = require.resolve(moduleName)
    if(require.cache[id]) {
        return require.cache[id].exports;
    }
    // module metadata
    const module = {
        exports: {},
        id
    }
    // Update the cache
    require.cache[id] = module

    // Load the module 
    loadModule(id, module, require)

    console.log('module is', module)

    // return exported variables
    return module.exports 
}



require.cache = {}

require.resolve = function(moduleName) {
    // Resolve a  full module id from the moduleName

    // We have three types of modules
    // file modules, core modules and package modules

    // We will assume we are only working with file modules
    return resolveFileModule(moduleName)
}


// Tests

let r = require('./req2')
console.log(r)
console.log('cache is', require.cache)
// Tests end




function resolveFileModule(moduleName){
    // Get path
    const p = path.resolve(moduleName) + '.js'
    console.log('file path for', moduleName, 'is', p)
    return p
}











