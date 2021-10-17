const createConfig = require('./config')
const strategies = require('./strategies')


// Create a configuration object using json strategy
const jsonConfig = createConfig(strategies.json)


jsonConfig.set('book.nodejs', 'Design Patterns')
jsonConfig.save('./info.json')
jsonConfig.read('./info.json')
console.log('json data', jsonConfig.get('book.nodejs'))


// Create a configuration package using ini
const iniConfig = createConfig(strategies.ini)

console.log('\n****\n');

iniConfig.set('game.players', ['A', 'B', 'C'])
iniConfig.save('./game.ini')
iniConfig.read('./game.ini')
console.log('****\nini data', iniConfig.get('game.players'))