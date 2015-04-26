var js        = {}
var jsPath    = '/public/js/'
var jsGame    = 'build/game.js'
js.web        = { path: jsPath }
js.build      = { path: 'web' + jsPath }
js.build.game = js.build.path + jsGame
js.web.game   = js.web.path + jsGame
exports.js    = js


exports.box2d = {
    path          : 'bower_components/box2d.js/',
    debugDrawFile : 'embox2d-html5canvas-debugDraw.js',
    helperFile    : 'embox2d-helpers.js'
}