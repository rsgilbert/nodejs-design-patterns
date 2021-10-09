// Monkey patching refers to the practice of 
// modifying the existing objects at runtime to change
// or extend their behaviour or to apply temporary fixes

// patch logger 
const fs = require('fs')
const logger = require('./exp-cons')

logger.customMessage = function() {
    console.log('custom message functionality')
}

fs.a = 3