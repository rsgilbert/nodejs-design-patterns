const level = require('level')
let db = level(__dirname + '/db', { valueEncoding: 'json' })


const  levelSubscribe = require('./levelSubscribe')

// decorate db to add the subscribe
db = levelSubscribe(db)

db.subscribe({ doctype: 'pdf', language: 'fr' },
    function(k, val) {
        console.log('match at', k, val)
    }
)

db.put('1', { doctype: 'docx', language: 'en' })
db.put('2', { doctype: 'pdf', language: 'fr' })



