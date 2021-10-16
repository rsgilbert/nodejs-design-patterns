const fs = require('fs')
const split = require('split')
const request = require('request')
const ParallelStream = require('./parallelStream')


const urlContainerFileName = './my-urls.txt'

fs.createReadStream(urlContainerFileName)
    .pipe(split())
    .pipe(new ParallelStream(function(url, enc, done) {
        if(!url) done();
        const self = this;
        request.head(url, function(err, response) {
            self.push(url + ' is ' + (err ? 'down\n' : 'up\n'))
            done()
        })
    }))
    // output the file results into another file
    // This file will be created even when there is an error at the start
    .pipe(fs.createWriteStream('./url-results.txt')) 
    .on('finish', () => {
        console.log('All urls have been checked')
    })