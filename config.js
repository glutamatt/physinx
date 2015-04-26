var js        = {}
var jsPath    = '/public/js/'
var jsGame    = 'build/game.js'
var jsLibs    = 'build/libs.js'
js.web        = { path: jsPath }
js.build      = { path: 'web' + jsPath }
js.build.game = js.build.path + jsGame
js.build.libs = js.build.path + jsLibs
js.web.game   = js.web.path + jsGame
js.web.libs   = js.web.path + jsLibs
exports.js    = js


var box2dPath = 'bower_components/box2d.js/'
exports.box2d = {
    box2dFile     : box2dPath + 'build/Box2D_v2.3.1_min.js',
    debugDrawFile : box2dPath + 'helpers/embox2d-html5canvas-debugDraw.js',
    helperFile    : box2dPath + 'helpers/embox2d-helpers.js'
}