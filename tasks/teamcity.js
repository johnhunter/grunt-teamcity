/* jshint node:true */
/*
 * grunt-teamcity
 *
 *
 * Copyright (c) 2013 John Hunter
 * Licensed under the MIT license.
 */

'use strict';

// Nodejs libs.
var util = require('util');

module.exports = function(grunt) {

  grunt.registerMultiTask('teamcity', 'Send log warnings in TeamCity service message format.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      suppressGruntLog: false,
      status: {
        // TC WARNING does not trigger a task fail
        warning: 'ERROR',
        failure: 'FAILURE',
        error: 'ERROR'
      }
    });

    var log = grunt.log;
    var _log = {
      warn: log.warn,
      error: log.error,
      errorlns: log.errorlns,
      fail: log.fail
    };


    log.warn = function() {
      if (!options.suppressGruntLog) {
        _log.warn.apply(log, arguments);
      }
      writeMsg(format(arguments), options.status.warning);
    };

    log.error = function() {
      if (!options.suppressGruntLog) {
        _log.error.apply(log, arguments);
      }
      writeMsg(format(arguments), options.status.error);
    };

    log.errorlns = function() {
      if (!options.suppressGruntLog) {
        _log.errorlns.apply(log, arguments);
      }
      writeMsg(format(arguments), options.status.error);
    };

    log.fail = function() {
      if (!options.suppressGruntLog) {
        _log.fail.apply(log, arguments);
      }
      writeMsg(format(arguments), options.status.failure);
    };


    function writeMsg (msg, status) {
      if (msg) {
        process.stdout.write(tcFormat(msg, status));
      } else {
        process.stdout.write(tcFormat(status, status));
      }
    }

    function tcFormat(text, status, errorDetails) {
      if (text.indexOf('##teamcity[') !== -1) {
        return text;
      }

      return  ("##teamcity[message text='" + escape(text) +
        "' errorDetails='" + escape(errorDetails || '') +
        "' status='" + escape(status) + "']\n").grey;
    }

    function escape(text){
      return (text || '').replace("'","|'").replace("\n","|n").replace("\r","|r").replace("\f","|f");
    }

    // verbatum from grunt.log
    function format(args) {
      // Args is a argument array so copy it in order to avoid wonky behavior.
      args = [].slice.call(args, 0);
      if (args.length > 0) {
        args[0] = String(args[0]);
      }
      return util.format.apply(util, args);
    }
  });

};
