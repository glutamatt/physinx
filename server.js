var box2d = require('./physics/box2d')

var world = new box2d.b2World( new box2d.b2Vec2(0.0, -10.0) );
console.log(world)
var groundBody = world.CreateBody( new box2d.b2BodyDef() );
console.log(groundBody)