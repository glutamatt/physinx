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

    var world = new box2d.b2World(new box2d.b2Vec2(0.0, -10.0));
    onWorldCreated(world)

    // ground
    var groundFixDef = new box2d.b2FixtureDef
    var groundShape = new box2d.b2PolygonShape
    groundShape.SetAsBox(10, .3)
    groundFixDef.set_shape(groundShape)
    var groundBodyDef = new box2d.b2BodyDef
    groundBodyDef.set_type(box2d.b2_staticBody)
    groundBodyDef.get_position().set_x(5)
    groundBodyDef.get_position().set_y(-15)
    world.CreateBody(groundBodyDef).CreateFixture(groundFixDef)

    //Cube
    var fixDef = new box2d.b2FixtureDef
    fixDef.set_density(1)
    fixDef.set_friction(.5)
    fixDef.set_restitution(.2)
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

    //Cube2
    var fixDef = new box2d.b2FixtureDef
    fixDef.set_density(1)
    fixDef.set_friction(.5)
    fixDef.set_restitution(.2)
    var bodyDef = new box2d.b2BodyDef
    bodyDef.set_type(box2d.b2_dynamicBody)
    var shape = new box2d.b2PolygonShape
    shape.SetAsBox(.5, .5)
    fixDef.set_shape(shape)
    bodyDef.get_position().set_x(5.2)
    bodyDef.get_position().set_y(7)
    bodyDef.set_angle(Math.PI/6)
    var newbody2 = world.CreateBody(bodyDef)
    newbody2.CreateFixture(fixDef)

    //Ball
    var bodyDef = new box2d.b2BodyDef
    bodyDef.set_type(box2d.b2_dynamicBody)
    var shape = new box2d.b2CircleShape
    shape.set_m_radius(.5)
    fixDef.set_shape(shape)
    bodyDef.get_position().set_x(5)
    bodyDef.get_position().set_y(2)
    bodyDef.set_angle(Math.PI/3)
    var circleBody = world.CreateBody(bodyDef)
    circleBody.CreateFixture(fixDef)

	setInterval(function() {
        world.Step(1/25, 20, 20);
        console.log(newbody.GetAngle(), newbody2.GetAngle(), newbody.GetPosition().get_y())
        onStep(world)
	}, 1000/25);

    return {box2d: box2d, world: world}
}