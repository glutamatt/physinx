require('_process').stderr = {write: function(m){console.log(m)}}

var pixelsByMeter = 30

var core = require('./core')
core.setBox2d(Box2D)
var debug = require('./../web/debug')
debug.init(core.box2d, document.getElementById("canvas"), pixelsByMeter)

core.setOnWorldCreated(function(world) {
    debug.onWorldCreated(world)
})

core.setOnStep(function(world) {
    debug.draw()}
)

core.start()
