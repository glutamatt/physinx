var box2d, Box2D
var world
var queryCallback
var mouseJointGroundBody

exports.setBox2d = function(box2D) {
    exports.box2d = box2d = Box2D = box2D
}

var onWorldCreated = function() {}
exports.setOnWorldCreated = function(callback) {
    onWorldCreated = callback
}

var onStep = function() {}
exports.setOnStep = function(callback) {
    onStep = callback
}

var onBodyCreated = function() {}
exports.setOnBodyCreated = function(callback) {
    onBodyCreated = callback
}

var bodies = {}

exports.createCube = function(bodyId, boxW, boxH, posX, posY, angle) {

    if (bodyId && bodyId in bodies) return bodies[bodyId]

    var fixDef = new box2d.b2FixtureDef
    fixDef.set_density(1)
    fixDef.set_friction(.5)
    fixDef.set_restitution(.2)
    var bodyDef = new box2d.b2BodyDef
    bodyDef.set_type(box2d.b2_dynamicBody)
    var shape = new box2d.b2PolygonShape
    shape.SetAsBox(boxW, boxH)
    fixDef.set_shape(shape)
    bodyDef.get_position().set_x(posX)
    bodyDef.get_position().set_y(posY)
    bodyDef.set_angle(angle)
    var newbody = world.CreateBody(bodyDef)
    newbody.CreateFixture(fixDef)

    onBodyCreated('createCube', [newbody.e, boxW, boxH, posX, posY, angle])
    bodies[bodyId || newbody.e] = newbody

    return newbody
}


var mouseJoint //tmp unique for now
exports.startMouseJoint = function(x, y) {
    var aabb = new Box2D.b2AABB();
    var d = 0.001;            
    aabb.set_lowerBound(new Box2D.b2Vec2(x - d, y - d));
    aabb.set_upperBound(new Box2D.b2Vec2(x + d, y + d));
    
    queryCallback.m_fixture = null;
    queryCallback.m_point = new Box2D.b2Vec2(x, y);
    world.QueryAABB(queryCallback, aabb);
    if (!queryCallback.m_fixture) return

    var body = queryCallback.m_fixture.GetBody();
    var md = new Box2D.b2MouseJointDef();
    md.set_bodyA(mouseJointGroundBody);
    md.set_bodyB(body);
    md.set_target(new Box2D.b2Vec2(x, y))
    md.set_maxForce(100 * body.GetMass())
    md.set_collideConnected(true);

    mouseJoint = Box2D.castObject( world.CreateJoint(md), Box2D.b2MouseJoint )
    body.SetAwake(true)
}
exports.destroyMouseJoint = function() {
    if ( mouseJoint == null ) return
    world.DestroyJoint(mouseJoint);
    mouseJoint = null;
}
exports.moveMouseJoin = function(x, y) {
    if (mouseJoint != null ) {
        mouseJoint.SetTarget( new Box2D.b2Vec2(x, y) )
    }
}

var bodiesUpdates = {
    get: function() {
        var updates = {}
        var pos, body
        for(var i in bodies) {
            body = bodies[i]
            if (body.IsAwake()) {
                pos = body.GetPosition()
                updates[i] = [pos.get_x(), pos.get_y(), body.GetAngle()]
            }
        }

        return updates
    },
    set: function (updates) {
        for(var i in updates) {
            if( !(body = bodies[i]) ) return
            body.SetAwake(true)
            pos = body.GetPosition()
            pos.set_x(updates[i][0])
            pos.set_y(updates[i][1])
            body.SetTransform(pos, updates[i][2])
        }
    }
}

exports.bodiesUpdates = bodiesUpdates

exports.start = function() {

    world = new box2d.b2World(new box2d.b2Vec2(0.0, -10.0), false);
    onWorldCreated(world)
    mouseJointGroundBody = world.CreateBody(new Box2D.b2BodyDef())
    queryCallback = new Box2D.JSQueryCallback
    queryCallback.ReportFixture = function(fixturePtr) {
        var fixture = Box2D.wrapPointer(fixturePtr, Box2D.b2Fixture)
        if (fixture.GetBody().GetType() != Box2D.b2_dynamicBody ||
            !fixture.TestPoint( this.m_point )
        ) return true;
        this.m_fixture = fixture;
        return false;
    }

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

    //Ball
    /*
    var fixDef = new box2d.b2FixtureDef
    fixDef.set_density(1)
    fixDef.set_friction(.5)
    fixDef.set_restitution(.2)
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
    */

	setInterval(function() {
        world.Step(1/25, 20, 20)
        onStep(world)
	}, 1000/25);

    return {box2d: box2d, world: world}
}
