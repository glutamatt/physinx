var core = require('./core')
core.setBox2d(require('../physics/box2d'))
exports.start = core.start