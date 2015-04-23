console.log('config')

var public_path = 'public/js/build/webpoc.js'

exports.web = {
	js: {
        public_path: public_path,
		build_path: 'web/' + public_path
	}
}