// Pattern: Use a stream or a combination of streams
// to easily iterate over a set of asynchronous tasks
// in sequence

const fromArray = require('from2-array')
const through = require('through2')
const fs = require('fs')


function concatFiles(destination, files, callback) {
    const destStream = fs.createWriteStream(destination)

    fromArray.obj(files)
        .pipe(through.obj(function(file, enc, done) {
            const src = fs.createReadStream(file)
            src.pipe(destStream, { end: false })
            src.on('end', () => { 
                console.log('done with', file)
                done()
            })
        }))
        .on('finish', () => {
            destStream.end()
            console.log('finished')
            callback()
        })
}

module.exports = concatFiles