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
const util = require('util');
const fs = require('fs');


const escape = text => {
  return (text || '').replace("'","|'").replace("\n","|n").replace("\r","|r").replace("\f","|f");
};

const tcFormat = (text, status, errorDetails) => {
  if (text.indexOf('##teamcity[') !== -1) {
    return text;
  }

  return  ("##teamcity[message text='" + escape(text) +
    "' errorDetails='" + escape(errorDetails || '') +
    "' status='" + escape(status) + "']\n").grey;
};

const writeSync = text => fs.writeSync(process.stdout.fd,text);

const writeMsg = (msg, status) => {
  if (msg) {
    writeSync(tcFormat(msg, status));
  } else {
    writeSync(tcFormat(status, status));
  }
};

// verbatum from grunt.log
const format = args => {
  // Args is a argument array so copy it in order to avoid wonky behavior.
  args = [].slice.call(args, 0);
  if (args.length > 0) {
    args[0] = String(args[0]);
  }
  return util.format.apply(util, args);
};

module.exports = function(grunt) {

  grunt.registerMultiTask('teamcity', 'Send log warnings in TeamCity service message format.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    const options = this.options({
      suppressGruntLog: false,
      status: {
        // TC WARNING does not trigger a task fail
        warning: 'ERROR',
        failure: 'FAILURE',
        error: 'ERROR'
      }
    });

    const log = grunt.log;
    const _log = {
      warn: log.warn,
      error: log.error,
      errorlns: log.errorlns,
      fail: log.fail
    };


    log.warn = (...args) => {
      if (!options.suppressGruntLog) {
        _log.warn.apply(log, args);
      }
      writeMsg(format(args), options.status.warning);
    };

    log.error = (...args) => {
      if (!options.suppressGruntLog) {
        _log.error.apply(log, args);
      }
      writeMsg(format(args), options.status.error);
    };

    log.errorlns = (...args) => {
      if (!options.suppressGruntLog) {
        _log.errorlns.apply(log, args);
      }
      writeMsg(format(args), options.status.error);
    };

    log.fail = (...args) => {
      if (!options.suppressGruntLog) {
        _log.fail.apply(log, args);
      }
      writeMsg(format(args), options.status.failure);
    };
  });
};
