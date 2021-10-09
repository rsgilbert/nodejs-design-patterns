// import the Logger and call it as a constructor
const Logger = require('./exp-cons')


// make a constructor call
const dbLogger = new Logger('DB')
console.log(dbLogger)
dbLogger.log('Inserted items')
dbLogger.info('Great work in your data')
dbLogger.verbose('All of this, was it necessary?')

const accessLogger = new Logger('ACCESS')
accessLogger.log('Accessed remote desktop')
console.log(accessLogger)


// We put a guard against non-constructor
// invocations that convert the invocation into a
// constructor invocation. So below is also fine
const simpleLogger = Logger('SIMPLE')
console.log(simpleLogger)
