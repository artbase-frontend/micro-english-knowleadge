module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: grunt.file.readJSON('environment/grunt/connect.config.json'),
    watch: {
      files: 'app/**',
      tasks: ['bootlint', 'jshint'],
      options: {
        livereload: true
      }
    },
    'modules-graph': grunt.file.readJSON('environment/grunt/modules-graph.config.json'),
    graphviz: grunt.file.readJSON('environment/grunt/graphviz.config.json'),
    angular_architecture_graph: grunt.file.readJSON('environment/grunt/angular-architecture-graph.config.json'),
    bootlint: grunt.file.readJSON('environment/grunt/bootlint.config.json'),
    jshint: {
      all: ['Gruntfile.js', 'app/*.js', 'app/**/*.js']
    },
    ngconstant: {
      options: {
        name: 'MekConstants',
        dest: 'app/config/mek.constants.js',
        constants: {
          CONFIG: grunt.file.readJSON('environment/config.json')
        }
      },
      dev: {
        constants: {
          CONFIG: grunt.file.readJSON('environment/config.dev.json')
        },
        values: {
          debug: true
        }
      },
      prod: {
        constants: {
          CONFIG: grunt.file.readJSON('environment/config.prod.json')
        },
        values: {
          debug: false
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-angular-modules-graph');
  grunt.loadNpmTasks('grunt-graphviz');
  grunt.loadNpmTasks('grunt-angular-architecture-graph');
  grunt.loadNpmTasks('grunt-bootlint');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ng-constant');

  // Default task(s).
  grunt.registerTask('default', ['ngconstant:dev', 'connect', 'watch']);
};