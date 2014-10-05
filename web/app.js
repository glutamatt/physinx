var express = require('express');
var app = express();

var webConf = {};

//template engine
swig = require('swig')
app.engine('html', swig.renderFile)
app.set('view engine', 'html');
app.set('views', __dirname + '/view')
app.set('view cache', false)
swig.setDefaults({ cache: false })

// controllers
app.get('/', function(req, res){
  res.render('default.html', {content: 'Hello World', js_path: webConf.jsBuildPath});
})

//Start
exports.start = function(jsBuildPath) {
	webConf.jsBuildPath = jsBuildPath;
	var server = app.listen(3000, function() {
    	console.log('Listening on port %d', server.address().port);
	})
}