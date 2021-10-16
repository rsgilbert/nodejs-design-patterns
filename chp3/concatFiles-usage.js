const concatFiles = require('./concatFiles')

const destination = 'concDest.txt'
const files = [
    './flowMode.js', 
    './generateStream.js',
    './toFileStream.js'
]

concatFiles(destination, files, () => {
    console.log('Now we are done with the concatenation')
})
