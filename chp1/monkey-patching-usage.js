const logger = require('./exp-cons')
const fs = require('fs')
// logger.customMessage()

// monkey patching module modifies
// logger adding an extra function to it
// This is a side-effect and its dangerous
require('./monkey-patching')

// const logger = require('./exp-cons')

logger.customMessage()
console.log(fs.a)