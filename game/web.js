var process = require('_process')
process.stderr = {
    write: function(m){console.log(m)}
}


require('./core').start()
