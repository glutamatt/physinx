var core = require('./core')
core.setBox2d(require('../physics/box2d'))

exports.start = function(io) {
    core.start()

    var startPopulate = function(){
        setInterval(function() {
            core.createCube(
                null, //id
                .5 * (Math.floor(Math.random() * 2) + 1), //w
                .5 * (Math.floor(Math.random() * 2) + 1), //h
                5 * Math.random() * 2, //x
                0, //y
                Math.PI/(Math.random() * 4)// angle
            )
        }, 3000)
    }

    var populateTimeout

    core.setRemoteSync(function(method, args) {io.emit('remoteSync', [method, args])})
    core.setOnStep(function(){ io.emit('bodiesUpdate', core.bodiesUpdates.get())})

    var uCall = function(f, args) {return f.apply(f, args)}

    io.on('connection', function(socket){
        var mouseJoint = null
        socket.on('onBodyPress', function(args) { mouseJoint = uCall(core.startMouseJoint, args)})
        socket.on('moveMouseJoint', function(args) { args.unshift(mouseJoint); uCall(core.moveMouseJoint, args)})
        socket.on('destroyMouseJoint', function() { uCall(core.destroyMouseJoint, [mouseJoint]) ; mouseJoint = null })

        clearTimeout(populateTimeout)
        populateTimeout = setTimeout(startPopulate, 5000)
    })
}
