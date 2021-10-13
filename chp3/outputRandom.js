const chance = require('chance').Chance()

require('http').createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })

    function generateMore() {
        while(chance.bool({ likelihood: 100 })) {
            const data = chance.string({ length: 16 * 1000 * 5}) + '\n'
            const shouldContinue = res.write(data)
            console.log(data)
            if(!shouldContinue) {
                // You'll need to use curl to see chunked data responses from cli http request
                console.log('backpressure')
                return res.once('drain', () => {
                    // drain event is emitted when the internal 
                    // buffer has been emptied
                    return setTimeout(() => {
                        console.log('here')
                        generateMore()
                    }, 1000)   
                })                            
            }      
            res.end('\n*** The End ***\n', () => {
                //  console.log('ended response')
            })                
        }

    }
    generateMore()

    res.on('finish', () => {
        console.log('Finished sending data')
    })
})
.listen(8080, () => {
    console.log('Listening')
})