var box2d = require('../physics/box2d')

exports.box2d = box2d

var onWorldCreated = function() {}
exports.setOnWorldCreated = function(callback) {
    onWorldCreated = callback
}

var onStep = function() {}
exports.setOnStep = function(callback) {
    onStep = callback
}

exports.start = function() {

    var world = new box2d.b2World( new box2d.b2Vec2(0.0, -5.0));
    onWorldCreated(world)

    var fixDef = new box2d.b2FixtureDef
    fixDef.density = 0.7
    fixDef.friction = 0.5
    fixDef.restitution = 0.2
    var bodyDef = new box2d.b2BodyDef
    bodyDef.set_type(box2d.b2_dynamicBody)
    var shape = new box2d.b2PolygonShape;
    shape.SetAsBox(2, 2)
    fixDef.set_shape(shape)
    bodyDef.get_position().set_x(2)
    bodyDef.get_position().set_y(0)
    var newbody = world.CreateBody(bodyDef)
    newbody.CreateFixture(fixDef)

	setInterval(function() {
        world.Step(1/60, 3, 2);
        console.log(newbody.GetPosition().get_y())
        world.ClearForces()
        onStep(world)
	}, 300);

    return {box2d: box2d, world: world}
}