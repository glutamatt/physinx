var box2d = require('../physics/box2d')

exports.box2d = box2d
exports.start = function(callbacks) {

    var world = new box2d.b2World( new box2d.b2Vec2(0.0, -10.0) );
    'onWorldCreated' in callbacks && callbacks['onWorldCreated'](world)

    var groundBody = world.CreateBody( new box2d.b2BodyDef() );

    var bd = new box2d.b2BodyDef();
    bd.set_type(box2d.b2_dynamicBody);
    bd.set_position(new box2d.b2Vec2(0, 0));

    var body = world.CreateBody(bd);

	setInterval(function() {
	    world.Step(1/60, 3, 2);
        'onStep' in callbacks && callbacks['onStep'](world)
	    console.log(body.GetPosition().get_y())
	}, 300);

    return {box2d: box2d, world: world}
}