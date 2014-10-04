var box2d = require('./physics/box2d')

var world = new box2d.b2World( new box2d.b2Vec2(0.0, -10.0) );
var groundBody = world.CreateBody( new box2d.b2BodyDef() );

var bd = new box2d.b2BodyDef();
bd.set_type(box2d.b2_dynamicBody);
bd.set_position(new box2d.b2Vec2(0, 0));
var body = world.CreateBody(bd);

var step = function() {
    world.Step(1/60, 3, 2);
    console.log(body.GetPosition().get_y())
}
setInterval(step, 300);