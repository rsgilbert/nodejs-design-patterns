const ReplaceStream = require('./replaceStream')

// Take a stream of text from stdin and apply a replace
// transformation and then push the data back to stdout
// You can run this module like this: cat replace.js | node replace.js pipe zzzz
let searchString = process.argv[2] || ' '
let replaceString = process.argv[3] || '**'

// Pipe gets from readable and sends to writable
process.stdin   
    .pipe(new ReplaceStream(searchString, replaceString))
    .pipe(process.stdout)

    