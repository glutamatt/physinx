var world, canvas, context, pixelsByMeter

exports.init = function(box2d, pCanvas, pPixelsByMeter) {
    canvas = pCanvas
    context = canvas.getContext( '2d' )
    pixelsByMeter = pPixelsByMeter
    global.Box2D = box2d
    global.context = context
}

exports.draw = function() {
    context.fillStyle = 'rgb(0,0,0)'
    context.fillRect( 0, 0, canvas.width, canvas.height )
    context.save()
    context.scale(1,-1)
    context.scale(pixelsByMeter, pixelsByMeter)
    context.lineWidth = 1/pixelsByMeter;
    context.fillStyle = 'rgb(255,255,0)'
    world.DrawDebugData()
    context.restore()
}

exports.onWorldCreated = function(pWorld) {
    world = pWorld
    var debugDraw = getCanvasDebugDraw()
    debugDraw.SetFlags(1)
    world.SetDebugDraw(debugDraw)
}
