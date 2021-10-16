// !!
// Buggy. Didn't work


const tar = require('tar')
const fstream = require('fstream')
const path = require('path')



const destination = path.resolve('./dest.txt')
const sourceA = path.resolve('./tfs')
const sourceB = path.resolve('../chp2/async')
console.log(destination)

// Create tar stream and pipe it into its destination
const pack = new tar.Pack()
pack.pipe(fstream.Writer({
   path:  destination
}))

// initialize source streams
let endCount = 0
function onEnd() {
    if(++endCount === 2) {
        pack.end()
    }
}

// Create the readable streams that read from the sources
const sourceStreamA = fstream.Reader(
    { type: 'Directory', path: sourceA }
)
.on('end', onEnd)

const sourceStreamB = fstream.Reader(
    { type: 'Directory', path: sourceB }
)
.on('end', onEnd)

// Pipe the readable streams to the pack stream
// We disable auto-ending because one sourceStream
// may end before the other completes
// console.log('pack is', pack)
sourceStreamA.pipe(pack, { end: false })
// sourceStreamB.pipe(pack, { end: false })







