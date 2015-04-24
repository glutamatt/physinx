require('_process').stderr = {write: function(m){console.log(m)}}

var core = require('./core')

var callbacks = {
    onWorldCreated: function(world) {
        global.canvas = document.getElementById("canvas");
        global.context = canvas.getContext( '2d' );
        global.Box2D = core.box2d
        world.SetDebugDraw(getCanvasDebugDraw());
    },
    onStep: function(world) {
        world.DrawDebugData();
    }
}

core.start(callbacks)
