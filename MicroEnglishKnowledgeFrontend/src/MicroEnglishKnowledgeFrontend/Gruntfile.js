module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'app',
          open: true,
          livereload: true
        }
      }
    },
    watch: {
      files: 'app/**',
      tasks: ['bootlint', 'jshint'],
      options: {
        livereload: true
      }
    },
    'modules-graph': {
      options: {
        externalDependenciesColor: 'red'
      },
      files: {
        'architecture/destination-file.dot': ['app/*.js']
      }
    },
    graphviz: {
      files: {
        'architecture/dependencies-graph.png': 'architecture/destination-file.dot'
      }
    },
    angular_architecture_graph: {
      diagram: {
        files: {
          "architecture": ["app/*.js"]
        }
      }
    },
    bootlint: {
      options: {
        showallerrors: true,
        stoponerror: false,
        stoponwarning: false,
        relaxerror: []
      },
      files: ['app/*.html']
    },
    jshint: {
      all: ['Gruntfile.js', 'app/*.js', 'app/**/*.js']
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

  // Default task(s).
  grunt.registerTask('default', ['connect', 'watch']);
};