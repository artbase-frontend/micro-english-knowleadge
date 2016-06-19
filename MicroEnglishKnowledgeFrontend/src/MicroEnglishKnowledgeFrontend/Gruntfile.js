module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: grunt.file.readJSON('environment/grunt/connect.config.json'),
    watch: {
      files: 'app/**',
      tasks: ['bootlint', 'jshint', 'copy:dev'],
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
    },
    copy: {
      dev: {
        files: [
          {
            expand: true, 
            cwd: 'app',
            src: ['**'], 
            dest: 'dev/',
            
          }
        ],
        options: {
          process: function (content, srcpath) {
              if(srcpath === 'app/index.html')
              {
                  var paths = grunt.file.expand({filter: "isFile", cwd: "app"},["**"]);
                  paths.reverse();

                  var lines = '';
                  paths.forEach(function(element) {
                    if(element.indexOf('.js') > -1)
                    {
                      lines = lines + '<script src="' + element + '"></script> \n';
                    }
                  }, this);

                  return content.replace(/<script src="all-files.js"><\/script>/g, lines);
              } else{
                return content;
              }
              
          }
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
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('dev', ['ngconstant:dev', 'copy:dev', 'connect:dev', 'watch']);
};