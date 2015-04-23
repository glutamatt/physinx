var process = require('_process')
process.stderr = {
    write: function(m){console.log(m)}
}
var poc = require('./poc')
poc.start()

