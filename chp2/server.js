const express = require('express')

const app = express()

app.get('/', (req, res) => { 
    res.send('Date and time is ' + new Date().toISOString())
})


const port = 3000
app.listen(port, () => {
    console.log('runnning on port', port)
})