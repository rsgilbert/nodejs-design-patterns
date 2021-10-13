const RandomStream = require('./randomStream')

const randomStream = new RandomStream({ encoding: 'utf8' })
randomStream.on('readable', () => {
    let chunk 
    while((chunk = randomStream.read()) !== null) {
        console.log('chunk is', chunk)
    }
})