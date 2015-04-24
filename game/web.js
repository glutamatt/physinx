require('_process').stderr = {write: function(m){console.log(m)}}

require('./core').start()
