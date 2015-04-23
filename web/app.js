var express = require('express');
var app = express();
var appConf = require('../appConf')

//template engine
swig = require('swig')
app.engine('html', swig.renderFile)
app.set('view engine', 'html');
app.set('views', __dirname + '/view')
app.set('view cache', false)
swig.setDefaults({ cache: false })
app.use('/public', express.static(__dirname + '/public'))

// controllers
app.get('/', function(req, res){
  res.render('default.html', {content: 'Hello World', js_path: appConf.web.js.public_path});
})

//Start
exports.start = function(jsBuildPath) {
	var server = app.listen(3000, function() {
    	console.log('Listening on port %d', server.address().port);
	})
}