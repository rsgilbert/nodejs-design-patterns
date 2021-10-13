const fs = require('fs')
const zlib = require('zlib')

const filename = process.argv[2] || 'a.txt'


function zipStream() {
    fs.createReadStream(filename)
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream(`${filename}.gz`))
        .on('finish', () => {
            console.log('File successfully compressed')
        })
}
zipStream()

function zipBuffer() {
    fs.readFile(filename, (err, buffer) => {
        if(err) return console.log('fs read error', err)
        console.log('read buffer', buffer)
        zlib.gzip(buffer, (err, buffer) => {
            if(err) return console.log('zlib error', err)
            console.log('zlib buffer', buffer)
            fs.writeFile(`${filename}.gz`, buffer, err => {
                if(err) return console.log('write error', err)
                console.log('file successfully compressed')
            })
        })
    })
}