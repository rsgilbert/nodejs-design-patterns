// Forking a stream
// We transform to sha1 and also transform to md5
// Back pressure will work out of the box. The flow
// coming from inputStream will go as fast as the slowest
// branch of the fork

const fs = require('fs')
const crypto = require('crypto')
const util = require('util')
const Transform = require('stream').Transform


const MyStream = function(logger) {
    this.logger = logger
    Transform.call(this)
}

util.inherits(MyStream, Transform)

MyStream.prototype._transform = function(chunk, enc, cb) {
    // console.log('chunk is', chunk.toString())
    this.logger(chunk.length + ': ' + chunk.toString().substring(0, 10))
    this.push(chunk)
    cb()
}


const sha1Stream = crypto.createHash('sha1')
sha1Stream.setEncoding('base64')


const md5Stream = crypto.createHash('md5')
md5Stream.setEncoding('base64')


const fileName = './a.txt'

const inputStream = fs.createReadStream(fileName)


console.log('sha1 init')
inputStream
    .pipe(new MyStream(
        (ch) => console.log('sha1', ch)))
    .pipe(sha1Stream)
    .pipe(fs.createWriteStream(fileName + '.sha1'))

console.log('moving on to md5')

inputStream   
    .pipe(new MyStream(
        (ch) => console.log('md5', ch)))
    .pipe(md5Stream)
    .pipe(fs.createWriteStream(fileName + '.md5'))
console.log('code end')


