// Read from standard input and echo
// everything back to standard output

// Use command: cat zip.js | node readStdin.js > out.txt
// to read from zip.js and output into out.txt



process.stdin 
    .on('readable', () => {
        let chunk 
        console.log('new data available')
        // set encoding to utf8 so we read as strings
        process.stdin.setEncoding('utf8')
        while((chunk = process.stdin.read(10)) !== null) {
            // console.log('Chunk read', chunk.length, ':', chunk.toString())
            console.log(chunk)
        }
    })
    .on('end', () => {
        // Invoke by using Ctrl+D (linux) or Ctrl+Z (windows)
        process.stdout
            .write('End of stream')
    })