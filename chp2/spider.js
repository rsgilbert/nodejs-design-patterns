const request = require('request')
const fs = require('fs')
const mkdirp = require("mkdirp")
const path = require('path')
const utilities = require('./utilities')

// Callback hell
// Chapter 2, NDP
// Callback hell is the situation where the abundance of closures
// and in-place callback definitions transform the code into an
// unreadable and unmanageable blob.


// A function called spider which takes in the URL to download
// and a callback function that will be invoked when the 
// download process is complete
function spider(url, callback) {
    const filename = utilities.urlToFilename(url)
    fs.exists(filename, function(exists) {
        if(exists) {
            return void callback(null, filename, false)
        }
        return void download(url, filename, err => {
            if(err) {
                return void callback(err)
            }
            return callback(null, filename, true)
        })
    })
}

function download(url, filename, callback) {
    console.log('downloading ', url)
    request(url, function(err, response, body) {
        if(err) {
            return void callback(err)
        }
        saveFile(filename, body, err => {
            if(err) {
                return void callback(err)
            } 
            console.log("Download and saved", url)
        })
    })    
}

// Save dowmnloaded file
function saveFile(filename, contents, callback) {
    // Only version of mkdirp less than 1.0 support 
    // callbacks for mkdirp. Later versions use promises
    // To see versions, use: npm view mkdirp versions
    mkdirp(path.dirname(filename), function(err) {
        if(err) {
            return void callback(err)
        }
        fs.writeFile(filename, contents, callback)
    })

}


// invoke spider() function 
const url = 'http://localhost:3000'

spider(url, function(err, filename, downloaded) {
    if(err) {
        console.log(err)
    }
    else {
        if(downloaded) {
            console.log('Completed download of', filename)
        }
        else {
            console.log(filename, 'has already been downloaded')
        }
    }
})
