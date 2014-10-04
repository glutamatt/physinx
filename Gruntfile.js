module.exports = function(grunt) {

  grunt.initConfig({
    bower: { install : { options : { cleanTargetDir: true } } },
    concat: {
      options: {separator: ';'},
      dist: {
        src: ['bower_components/box2d.js/box2d.js', 'physics/module.js'],
        dest: 'physics/box2d.js'
      }
    },
    clean: ["./lib"]
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['bower', 'concat', 'clean']);
};