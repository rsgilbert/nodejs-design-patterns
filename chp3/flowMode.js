// Attach a listener to the data event.
// This will switch the stream into using the flowing mode.
// In this mode, data is pushed to the data listener as soon as it arrives
// The flowing mode offers less flexibility to control the flow of data

process.stdin
.on('data', chunk => {
    console.log('data chunk available')
    console.log(chunk)
    // stop stream from emiting data events.  
    //process.stdin.pause()
})