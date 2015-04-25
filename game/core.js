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

    var world = new box2d.b2World(new box2d.b2Vec2(0.0, -10.0), true);
    onWorldCreated(world)

    var fixDef = new box2d.b2FixtureDef
    fixDef.density = 1
    fixDef.friction = 0.3

    var bodyDef = new box2d.b2BodyDef
    bodyDef.set_type(box2d.b2_dynamicBody)
    var shape = new box2d.b2PolygonShape
    shape.SetAsBox(.5, .5)
    fixDef.set_shape(shape)
    bodyDef.get_position().set_x(5)
    bodyDef.get_position().set_y(0)
    bodyDef.set_angle(Math.PI/3)
    var newbody = world.CreateBody(bodyDef)
    newbody.CreateFixture(fixDef)

    // ground
    var groundFixDef = new box2d.b2FixtureDef
    groundFixDef.density = 0
    var groundShape = new box2d.b2PolygonShape
    groundShape.SetAsBox(10, .3)
    groundFixDef.set_shape(groundShape)
    bodyDef = new box2d.b2BodyDef
    bodyDef.get_position().set_x(5)
    bodyDef.get_position().set_y(-15)
    world.CreateBody(bodyDef).CreateFixture(groundFixDef)

	setInterval(function() {
        world.Step(1/30, 10, 10);
        console.log(newbody.GetPosition().get_y())
        world.ClearForces()
        onStep(world)
	}, 1000/30);

    return {box2d: box2d, world: world}
}