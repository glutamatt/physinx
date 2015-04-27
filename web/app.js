var express = require('express')
var app = express()
var http = require('http').Server(app)
var config = require('../config')

exports.io = require('socket.io')(http);

swig = require('swig')
app.engine('html', swig.renderFile)
app.set('view engine', 'html');
app.set('views', __dirname + '/view')
app.set('view cache', false)
swig.setDefaults({ cache: false })
app.use('/public', express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.render('default.html', {
    libsFilePath: config.js.web.libs,
    gameFilePath: config.js.web.game
  })
})

exports.start = function() {
    var server = http.listen(3000, function() {
        console.log('Listening on port %d', server.address().port);
    })
}
