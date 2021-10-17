// A plugin used to subscribe to receive notifications
// everytime an object with a certain
// pattern is saved into the database

module.exports = function levelSubscribe(db) {
    // We decorate the db object with a new 
    // method named subscribe().
    db.subscribe = function(pattern, listener) {
        db.on('put', function(key, value) {
            // Verify that all the properties in 
            // the provided pattern are also 
            // available on the data being put
            let match = Object.keys(pattern).every(function(k) {
                return pattern[k] === value[k]
            })
            if(match) { 
                listener(key, value)
            }
        })
    }
    return db
}