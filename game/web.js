require('_process').stderr = {write: function(m){console.log(m)}}

var io = global.io()

var pixelsByMeter = 30

var core = require('./core')
core.setBox2d(Box2D)

var debug = require('./../web/debug')
debug.init(core.box2d, document.getElementById("canvas"), pixelsByMeter)

debug.onBodyPress(function(x, y){ io.emit('onBodyPress', [x, y])})
debug.onMouseJointMove(function (x, y){io.emit('moveMouseJoint', [x, y])})
debug.onMouseJointDestroy(function (){ io.emit('destroyMouseJoint')})

core.setOnWorldCreated(function(world) {debug.onWorldCreated(world)})
core.setOnStep(function() {debug.draw()})

core.start()

io.on('remoteSync', function(args) {
    core[args[0]] || console.log(args[0])
    core[args[0]].apply(core[args[0]], args[1])
})
io.on('bodiesUpdate', function(updates) {core.bodiesUpdates.set(updates)})