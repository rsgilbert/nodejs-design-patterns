const ToFileStream = require('./toFileStream')

const tfs = new ToFileStream()


tfs.write({ 
    path: 'tfs/a.txt', content: 'Great King'
})


tfs.write({ 
    path: 'tfs/bcd.txt', content: 'Basketball'
})

tfs.end(() => {
    console.log('done creating files')
})

// finish event same as tfs.end(() => void)
// Of the two, the one called first depends on 
// source code ordering. Here finish cb is called
// after tfs.end
tfs.on('finish', () => {
    console.log('finished')
})

