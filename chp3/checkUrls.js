const fs = require('fs')
const split = require('split')
const request = require('request')
const ParallelStream = require('./parallelStream')
const LimitedParallelStream = require('./limitedParallelStream')
const throughParallel = require('through2-parallel')


const urlContainerFileName = './my-urls.txt'

// ordered limited parallel execution
fs.createReadStream(urlContainerFileName)
    .pipe(split())
    .pipe(throughParallel.obj({concurrency: 12},
        function (url, enc, done) {
            console.log('working on url', url)
            if (!url) done();
            const self = this;
            request.head(url, function (err, response) {
                self.push(url + ' is ' + (err ? 'down\n' : 'up\n'))
                done()
            })
        }))
    // output the file results into another file
    // This file will be created even when there is an error at the start
    .pipe(fs.createWriteStream('./my-results.txt'))
    .on('finish', () => {
        console.log('All urls have been checked')
    })


// use LimitedParallelStream
// fs.createReadStream(urlContainerFileName)
//     .pipe(split())
//     .pipe(new LimitedParallelStream(1, function (url, enc, done) {
//         if (!url) done();
//         const self = this;
//         request.head(url, function (err, response) {
//             self.push(url + ' is ' + (err ? 'down\n' : 'up\n'))
//             done()
//         })
//     }))
//     // output the file results into another file
//     // This file will be created even when there is an error at the start
//     .pipe(fs.createWriteStream('./my-results.txt'))
//     .on('finish', () => {
//         console.log('All urls have been checked')
//     })


// use ParallelStream
// fs.createReadStream(urlContainerFileName)
//     .pipe(split())
//     .pipe(new ParallelStream(function(url, enc, done) {
//         if(!url) done();
//         const self = this;
//         request.head(url, function(err, response) {
//             self.push(url + ' is ' + (err ? 'down\n' : 'up\n'))
//             done()
//         })
//     }))
//     // output the file results into another file
//     // This file will be created even when there is an error at the start
//     .pipe(fs.createWriteStream('./url-results.txt')) 
//     .on('finish', () => {
//         console.log('All urls have been checked')
//     })

