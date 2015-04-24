#!/usr/bin/env node

var server = require('./game/server')
var webapp = require('./web/app')

server.start()
webapp.start()