require('_process').stderr = {write: function(m){console.log(m)}}

var io = global.io()

var pixelsByMeter = 30

var core = require('./core')
core.setBox2d(Box2D)

var debug = require('./../web/debug')
debug.init(core.box2d, document.getElementById("canvas"), pixelsByMeter)
core.setOnWorldCreated(function(world) {debug.onWorldCreated(world)})
core.setOnStep(function(world) {debug.draw()})

core.start()

io.on('bodyCreated', function(args) {
    body = core[args[0]].apply(core[args[0]], args[1])
    console.log(body)
})

io.on('bodiesUpdate', function(args) {
    console.log(args)
})