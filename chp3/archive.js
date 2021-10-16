const fs = require('fs')
const combinedStreams = require('./combinedStreams')

const compressAndEncryptStream = combinedStreams.compressAndEncrypt

const fileName = './a.txt'
const password = '123'
const compressedFileName = './a.txt.gz.enc'

fs.createReadStream(fileName)
.on('error', err => {
    // this error may come from any of the streams in 
    // the pipeline
    console.log('read stream error:', err)
})
.pipe(compressAndEncryptStream(password))
.on('error', err => {
    // this error may come from any of the streams in 
    // the pipeline
    console.log('error in pipeline', err)
})
.pipe(fs.createWriteStream(compressedFileName))
