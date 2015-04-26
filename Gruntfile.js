module.exports = function(grunt) {

  var config = require('./config')

  grunt.initConfig({
    bower: { install : { options : { cleanTargetDir: true } } },
    concat: {
      options: {separator: ';'},
      box2dServer: {
        src: [config.box2d.box2dFile, 'physics/module.js'],
        dest: 'physics/box2d.js'
      },
      box2dWeb: {
        src: [config.box2d.debugDrawFile, config.box2d.helperFile, config.box2d.box2dFile],
        dest: config.js.build.libs
      }
    },
    clean: ["./lib"],
    browserify: {
      web: {
        src: ['game/web.js'],
        dest: config.js.build.game
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['bower', 'concat', 'browserify', 'clean']);
};