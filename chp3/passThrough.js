// Pass through is not abstract and can 
// be instantiated right away
const PassThrough = require('stream').PassThrough

const pass = new PassThrough()
pass.setEncoding('utf8')

pass.on('data', chunk => {
    console.log('chunk is', chunk)
})


pass.write('Teletubbies')
pass.write('Welcome')
pass.write('Where are you now?')

pass.end(() => { 
    console.log('Done')
})
