module.exports = function(grunt) {

  var config = require('./config')

  grunt.initConfig({
    bower: { install : { options : { cleanTargetDir: true } } },
    concat: {
      options: {separator: ';'},
      dist: {
        src: [config.box2d.path + 'build/Box2D_v2.3.1_min.js', 'physics/module.js'],
        dest: 'physics/box2d.js'
      }
    },
    clean: ["./lib"],
    browserify: {
      poc: {
        src: ['game/web.js'],
        dest: config.js.build.game
      }
    },
    copy: {
      main: {
        files: [
          {
            src: config.box2d.debugDrawFile,
            cwd: config.box2d.path + 'helpers/',
            dest: config.js.build.path,
            expand: true
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['bower', 'concat', 'copy', 'browserify', 'clean']);
};