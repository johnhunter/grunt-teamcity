/* global events, jshint node:true  */
'use strict';

var fs = require('fs');
var grunt = require('grunt');

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

exports.teamcity = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    var exec = require('child_process').exec,
      child;

    test.expect(1);
    exec('grunt teamcity isolated_test --no-color', function(err, stdout){
      var res = stdout.split('\n').slice(4);

      var firstLine = res.shift();
      var index = firstLine.indexOf('foo-bar-uniqe-string');
      test.ok(index > 0, 'foo', 'Message contains foo');
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
