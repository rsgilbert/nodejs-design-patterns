const fs = require('fs')
const zlib = require('zlib')
const http = require('http')
const crypto = require('crypto')

const filename = process.argv[2] || './a.txt'
const server = 'localhost'

const options = {
    hostname: server,
    port: 3000,
    path: '/',
    method: 'PUT',
    headers: {
        filename: `${filename}-frm-cl.txt.gz`,
        'content-type': 'application/octet-stream',
        'content-encoding': 'gzip'
    }
}
const req = http.request(options, res => {
    console.log('server response:', res.statusCode)
})

req.on('response', (res) => console.log('status:', res.statusMessage))

fs.createReadStream(filename)
    .pipe(zlib.createGzip())
    .pipe(crypto.createCipher('aes192', 'my-secret'))
    .pipe(req)
    .on('finish', () => {
        console.log('file successfully sent')
    })