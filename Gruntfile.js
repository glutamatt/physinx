module.exports = function(grunt) {

  grunt.initConfig({
    bower: { install : {} },
    concat: {
      options: {separator: ';'},
      dist: {
        src: ['bower_components/box2d.js/box2d.js', 'physics/module.js'],
        dest: 'physics/box2d.js',
      },
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['bower', 'concat');
};