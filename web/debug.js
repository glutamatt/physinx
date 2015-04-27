var world,
    canvas,
    context,
    pixelsByMeter,
    mouseDown,
    mousePosWorld,
    mousePosPixel,
    mouseJoint,
    myQueryCallback,
    mouseJointGroundBody

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

var onBodyPress = function (x, y) {}
exports.onBodyPress = function (callback) {
    onBodyPress = callback
}

var onMouseMove

function getWorldPointFromPixelPoint(pixelPoint) {
    return {                
        x: pixelPoint.x/pixelsByMeter,
        y: (pixelPoint.y - canvas.height)/pixelsByMeter
    }
}

var onMouseDown = function(canvas, evt) {   
    updateMousePos(canvas, evt);
    if ( !mouseDown ) startMouseJoint()
    mouseDown = true;
}

var updateMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    mousePosPixel = {
        x: evt.clientX - rect.left,
        y: canvas.height - (evt.clientY - rect.top)
    };
    mousePosWorld = getWorldPointFromPixelPoint(mousePosPixel)
}

var startMouseJoint = function() {    
    var aabb = new Box2D.b2AABB();
    var d = 0.001;            
    aabb.set_lowerBound(new Box2D.b2Vec2(mousePosWorld.x - d, mousePosWorld.y - d));
    aabb.set_upperBound(new Box2D.b2Vec2(mousePosWorld.x + d, mousePosWorld.y + d));
    myQueryCallback.m_fixture = null;
    myQueryCallback.m_point = new Box2D.b2Vec2(mousePosWorld.x, mousePosWorld.y);
    world.QueryAABB(myQueryCallback, aabb);
    if (!myQueryCallback.m_fixture) return
    onBodyPress(mousePosWorld.x, mousePosWorld.y)
}

var onMouseMove = function(canvas, evt) {
    updateMousePos(canvas, evt);
    if ( mouseDown ) {
        onMouseJointMove(mousePosWorld.x, mousePosWorld.y)
    }
}
var onMouseJointMove = function(x, y) {}
exports.onMouseJointMove = function(callback) {
    onMouseJointMove = callback
}

var onMouseJointDestroy = function() {}
exports.onMouseJointDestroy = function (callback) {
    onMouseJointDestroy = callback
}
var onMouseUp = function(canvas, evt) {
    mouseDown && onMouseJointDestroy()
    mouseDown = false
}

exports.onWorldCreated = function(pWorld) {
    world = pWorld
    var debugDraw = getCanvasDebugDraw()
    debugDraw.SetFlags(3)
    world.SetDebugDraw(debugDraw)
    mouseJointGroundBody = world.CreateBody( new Box2D.b2BodyDef() )
    myQueryCallback = new Box2D.JSQueryCallback

    myQueryCallback.ReportFixture = function(fixturePtr) {
        var fixture = Box2D.wrapPointer( fixturePtr, Box2D.b2Fixture );
        if (
            fixture.GetBody().GetType() != Box2D.b2_dynamicBody ||
            !fixture.TestPoint( this.m_point )
        ) return true;
        this.m_fixture = fixture;
        return false;
    };

    canvas.addEventListener('mousemove', function(e) {onMouseMove(canvas,e)}, false)
    canvas.addEventListener('mousedown', function(e) {onMouseDown(canvas,e)}, false)
    canvas.addEventListener('mouseup',   function(e) {onMouseUp(canvas,e)},   false);
    canvas.addEventListener('mouseout',  function(e) {onMouseUp(canvas,e)}, false);
}
