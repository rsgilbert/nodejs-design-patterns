const fs = require("fs");


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
const require = function(moduleName) {
    console.log('Require invoked for module: ' + moduleName)
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

    // return exported variables
    return module.exports 
}


require.cache = {}

require.resolve = function(moduleName) {
    /* Resolve a  full module id from the moduleName
}
















