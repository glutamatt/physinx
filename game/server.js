var core = require('./core')
core.setBox2d(require('../physics/box2d'))

exports.start = function(socketIo) {
    socketIo.on('connection', function(socket){
        console.log('a user connected')
    })
    
    core.start()
}
