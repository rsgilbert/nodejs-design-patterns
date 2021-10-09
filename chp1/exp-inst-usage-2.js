const logger = require('./exp-inst')
const usage1 = require('./exp-inst-usage-1')

logger.log('This is intentional')
logger.log('Another intentional');

usage1()
usage1()

logger.log('After usage 1')

// output will be:
/*
DEFAULT [1]: This is intentional
DEFAULT [2]: Another intentional
DEFAULT [3]: Usage1
DEFAULT [4]: Usage1
DEFAULT [5]: After usage 1
*/

// Use custom logger
const dataLogger = new logger.Logger('DATA');
dataLogger.log('crunchy bytes')
dataLogger.log('Exceeded 2MBs')
