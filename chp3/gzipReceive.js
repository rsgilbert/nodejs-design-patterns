const http = require('http')
const fs = require('fs')
const zlib = require('zlib')
const crypto = require('crypto')


const server = http.createServer((req, res) => {
    const filename = req.headers.filename;
    console.log('File request received:', filename)
    req
        // Decrypt first
        .pipe(crypto.createDecipher('aes192', 'my-secret'))
        .pipe(zlib.createGunzip())
        .on('error', err => {
            console.log('server error', err)
            res.writeHead(500, err.message)
            res.end('Failed with error:', err.message)
        })
        .pipe(fs.createWriteStream(filename + 'kk'))
        .on('finish', () => {
            res.writeHead(201, { 'content-type': 'text/plain'})
            res.end('That is it')
            console.log('File saved', filename)
        })
        .on('error', err => {
            console.log('server error', err)
            res.writeHead(500, err.message)
            res.end('Failed with error:', err.message)
        })
})

server.listen(3000, () => {
    console.log('listening')
})