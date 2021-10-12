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

