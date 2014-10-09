/*
 * grunt-teamcity
 *
 *
 * Copyright (c) 2013 John Hunter
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (and then tested).
    teamcity: {
      default_options: {},
      suppress_gruntlog_options: {
        options: {
          suppressGruntLog: true
        }
      },
      custom_status_mapping: {
        options: {
          status: {
            warning: 'CUSTOM',
            failure: 'CUSTOM',
            error:   'CUSTOM'
          }
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-bump');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);


  grunt.registerTask('isolated_test', function(){
    grunt.log.warn('foo-bar-uniqe-string');
  });
  grunt.registerTask('isolated_test_single_quotes', function(){
    grunt.log.warn("single'quote");
  });
  grunt.registerTask('isolated_test_line_breaks', function(){
    grunt.log.warn("new\n line");
  });

  grunt.registerTask('isolated_test_parse_twice', function(){
    grunt.log.warn("##teamcity['someMessage']");
  });
};
