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
    test.expect(1);

    var child = grunt.util.spawn({
      grunt: true,
      args: ['teamcity', 'isolated_test', '--no-color'],
      opts: {stdio: 'inherit'},
    }, function(err, result){
      // result.stdout is not flushed as it is not a TTY
      test.equal(result.stdout, 'foo', 'Message contains foo');
      test.done();
    });

    console.log('child.stdout.isTTY: ', Boolean(child.stdout.isTTY)); // false
    console.log('process.stdout.isTTY: ', Boolean(process.stdout.isTTY)); // true



  }/*,
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_options');
    var expected = grunt.file.read('test/expected/custom_options');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },*/
};
