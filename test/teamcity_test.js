/* global events, jshint node:true  */
'use strict';

var fs = require('fs');
var grunt = require('grunt');
var exec = require('child_process').exec;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/


// polyfill for Harmony String.contains
if(!('contains' in String.prototype)) {
  String.prototype.contains = function(str, startIndex) {
    return -1 !== String.prototype.indexOf.call(this, str, startIndex);
  };
}


exports.teamcity = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);
    exec('grunt teamcity:default_options isolated_test --no-color', function(err, stdout){

      var rawMsgCount = 0;
      var tcMsgCount = 0;
      stdout.split('\n').forEach(function(line){
        if (line.contains("##teamcity[message text='foo-bar-uniqe-string' errorDetails='' status='ERROR'")) {
          tcMsgCount++;
        }
        else if (line.contains("foo-bar-uniqe-string")) {
          rawMsgCount++;
        }
      });

      test.equal(rawMsgCount, 1, 'Message is output');
      test.equal(tcMsgCount, 1, 'Message is output in Teamcity format');
      test.done();
    });
  }/*,
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_options');
    var expected = grunt.file.read('test/expected/custom_options');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },*/
};
