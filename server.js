var conf = require('./appConf')

var poc = require('./game/poc')
var webapp = require('./web/app')

poc.start()
webapp.start(conf.web.js.build_path)