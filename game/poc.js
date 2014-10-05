var box2d = require('../physics/box2d')

var world = new box2d.b2World( new box2d.b2Vec2(0.0, -10.0) );

var bd = new box2d.b2BodyDef();
bd.set_type(box2d.b2_dynamicBody);
bd.set_position(new box2d.b2Vec2(0, 0));
var body = world.CreateBody(bd);

exports.start = function() {
	setInterval(function() {
	    world.Step(1/60, 3, 2);
	    console.log(body.GetPosition().get_y())
	}, 300);	
}