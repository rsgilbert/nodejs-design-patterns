module.exports.urlToFilename = function(url) {
    return './downloads/spider/f.txt'
}

module.exports.tLink = function(t) {
    return `./downloads/spider/${t}.txt`
}

module.exports.timeout = (time, callback) => {
    setTimeout(callback, time)
}

module.exports.second = callback => setTimeout(callback, 1000)

module.exports.promisify = function(callbackBasedApi) {
    return function promisified() {
        const args = Array.from(arguments)
        return new Promise(function(resolve, reject) {
            // Put the callback to be used by
            // callbackBasedApi into args
            args.push(function(err, result) {
                if(err) {
                    return reject(err)
                }
                if(arguments.length <= 2) {
                    resolve(result)
                } 
                else {
                    // resolve with arguments from 
                    // one at index 1 onwards
                    resolve([].slice.call(arguments, 1))
                }
            })
            callbackBasedApi.apply(null, args)
        })
    }
}
