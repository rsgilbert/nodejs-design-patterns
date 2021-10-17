const { JsonConfig } = require('./configTemplate')

const jsonConfig = new JsonConfig()
console.log(jsonConfig)
jsonConfig.set('a.b.c', 13)
jsonConfig.save('a.txt')

const jsonConfig2 = new JsonConfig()
jsonConfig2.read('a.txt')
console.log(jsonConfig2.get('a.b.c'))
