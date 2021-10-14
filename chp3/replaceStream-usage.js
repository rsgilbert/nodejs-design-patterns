const ReplaceStream = require('./replaceStream')

// construct stream, specifying the searchString and replaceSTring
const rs = new ReplaceStream('re', 'yz')

rs.on('data', chunk => {
    // Log each transformed chunk
    // using flowing mode
    // Chunks are pushed out the moment they are available
    console.log('chunk is', chunk)
})

// rs.on('readable', () => {
    // Non flowing mode
       // Here everything will be read (pulled) all at once
//     let chunk 
//     while((chunk = rs.read()) != null) {
//         console.log('read chunk:', chunk)
//     }
// })

rs.write('Nice tr')
rs.write('ees darl')
rs.write('ingrejlkr')
rs.write('ei ko rem re k')

rs.end('please restart')