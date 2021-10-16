const zlib = require('zlib')
const crypto = require('crypto')
const combine = require('multipipe')
const fs = require('fs')
const util = require('util')
const Transform = require('stream').Transform


const MyStream = function() {
    Transform.call(this)
}

util.inherits(MyStream, Transform)

MyStream.prototype._transform = function(chunk, enc, cb) {
    console.log('chunk is', chunk.toString())
    this.emit('error', 'dont mind me')
    this.push(chunk)
    cb()
}

MyStream.prototype._flush = function(cb) {
    this.push('Gorilla')
    cb()
}

module.exports.compressAndEncrypt = function (password) {
    return combine(
        zlib.createGzip(),
        crypto.createCipher('aes192', password),
        new MyStream()
    )
    // .on('error', err => console.log('combine error', err))
}

module.exports.decryptAndDecompress = function(password) {
    return combine(
        crypto.createDecipher('aes192', password),
        zlib.createGunzip()
    )
}

