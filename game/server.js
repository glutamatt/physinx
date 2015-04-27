var core = require('./core')
core.setBox2d(require('../physics/box2d'))

exports.start = function(io) {
    core.start()

    core.setOnBodyCreated(function(method, args) {
        console.log(method, [args])
        io.emit('bodyCreated', [method, args])
    })

    core.setOnStep(function(world){
        io.emit('bodiesUpdate', core.bodiesUpdates.get())
    })

    setTimeout(function() {
        core.createCube(null, .5, .5, 5, 0, Math.PI/3)
        core.createCube(null, .5, .5, 5.2, 7, Math.PI/6)
    }, 3000)

    io.on('connection', function(socket){
        socket.on('onBodyPress', function(args) {
            core.startMouseJoint.apply(core.startMouseJoint, args)
        })
        socket.on('moveMouseJoin', function(args) {
            core.moveMouseJoin.apply(core.moveMouseJoin, args)
        })
        socket.on('destroyMouseJoint', function() {
            core.destroyMouseJoint.apply(core.destroyMouseJoint)
        })
    })
}
