require('_process').stderr = {write: function(m){console.log(m)}}

var core = require('./core')

core.setOnStep(function(world) {
    context.fillStyle = 'rgb(0,0,0)'
    context.fillRect( 0, 0, canvas.width, canvas.height )
    context.save()
    context.scale(1,-1)
    context.scale(30,30)
    context.fillStyle = 'rgb(255,255,0)'
    world.DrawDebugData()
    context.restore()
})

core.setOnWorldCreated(function(world) {
    global.canvas = document.getElementById("canvas");
    global.context = canvas.getContext( '2d' );
    global.Box2D = core.box2d
    var debugDraw = getCanvasDebugDraw()
    debugDraw.SetFlags(1)
    world.SetDebugDraw(debugDraw)
})

core.start()
