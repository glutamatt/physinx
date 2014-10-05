module.exports = function(grunt) {

  var appConf = require('./appConf')

  grunt.initConfig({
    bower: { install : { options : { cleanTargetDir: true } } },
    concat: {
      options: {separator: ';'},
      dist: {
        src: ['bower_components/box2d.js/box2d.js', 'physics/module.js'],
        dest: 'physics/box2d.js'
      }
    },
    clean: ["./lib"],
    browserify: {
      poc: {
        src: ['game/poc.js'],
        dest: appConf.web.js.build_path
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['bower', 'concat', 'browserify', 'clean']);
};