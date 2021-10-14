const stream = require('stream')
const util = require('util')

function ReplaceStream(searchString, replaceString) {
    stream.Transform.call(this, { 
        // So we receive strings instead of 
        // buffers inside _transform
        // decodeStrings: false 
    })
    this.setEncoding('utf8')
    this.searchString = searchString
    this.replaceString = replaceString
    this.tailPiece = ''
}

util.inherits(ReplaceStream, stream.Transform)

ReplaceStream.prototype._transform = function(chunk, encoding, callback) {
    // Search and replace a string when the data is streaming
    // and possible matches might be distributed across 
    // multiple chunks
    const pieces = (this.tailPiece + chunk).split(this.searchString)
    var lastPiece = pieces[pieces.length - 1]
    var tailPieceLen = this.searchString.length - 1 

    this.tailPiece = lastPiece.slice(-tailPieceLen)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen)
    this.push(pieces.join(this.replaceString))
    callback()
}


ReplaceStream.prototype._flush = function(callback) {
    // When the stream ends we might still have a last
    // tailPiece variable not pushed into the internal buffer
    this.push(this.tailPiece)
    // We have to make sure to invoke this 
    // callback when all operations are complete,
    // causing the stream to be terminated
    console.log('Flushed')
    callback()
}


module.exports = ReplaceStream

