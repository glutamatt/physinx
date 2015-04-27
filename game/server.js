var core = require('./core')
core.setBox2d(require('../physics/box2d'))

exports.start = function(io) {
    core.start()

    core.setOnBodyCreated(function(method, args) {
        console.log(method, [args])
        io.emit('bodyCreated', [method, args])
    })

    core.setOnStep(function(world, bodies){
        var updates = {}
        var pos, body
        for(var i in bodies) {
            body = bodies[i]
            pos = body.GetPosition()
            updates[i] = [pos.get_x(), pos.get_y(), body.GetAngle()]
        }
        io.emit('bodiesUpdate', updates)
    })

    io.on('connection', function(socket){
        core.createCube(null, .5, .5, 5, 0, Math.PI/3)
        core.createCube(null, .5, .5, 5.2, 7, Math.PI/6)
    })
}
