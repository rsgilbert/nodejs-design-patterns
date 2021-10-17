const path = require('path')

// Create an adapter that transforms LevelUP API
// into an interface compartible with fs module
// LevelUP is the adaptee
// createFsAdapter is the factory that creates our adapter
function createFsAdapter(db) {
    let fs = {}

    // We implement readFile() function inside our
    // factory and ensure that its interface is compatible 
    // with the one of the original function from the
    // fs module.

    // adapt readFile
    fs.readFile = function(filename, options, callback) {
        // We do some extra work to ensure the behaviour of 
        // our new function is as close as possible to the 
        // original fs.readFile() function
        if(typeof options === 'function') {
            callback = options;
            options = {};
        }
        else if(typeof options === 'string') {
            options = { encoding: options }
        }

        db.get(path.resolve(filename), 
            { valueEncoding: options.encoding },
            function(err, value) {
            if(err) {
                if(err.type === 'NotFoundError') {
                    err = new Error(`ENOENT, open '${filename}'`)
                    err.code = 'ENOENT'
                    err.errno = 34
                    err.path = filename
                }
                return callback && callback(err)
            }
            callback && callback(null, value)
        })
    }

    // adapt writeFile
    fs.writeFile = function(filename, contents, options, callback) {
        if(typeof options === 'function') {
            callback = options;
            options = {}
        }
        else if(typeof options === 'string') {
            options = { encoding: options }
        }

        db.put(path.resolve(filename), contents, 
            { valueEncoding: options.encoding },
            callback)
    }

    return fs
}

module.exports = createFsAdapter
