# grunt-teamcity

> Send gruntjs log warnings in TeamCity service message format.

[![Build Status](https://travis-ci.org/johnhunter/grunt-teamcity.svg?branch=master)](https://travis-ci.org/johnhunter/grunt-teamcity)

## Getting Started
This plugin requires Grunt `>=1.1.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-teamcity --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-teamcity');
```

## The "teamcity" task

### Overview
In your project's Gruntfile, add a section named `teamcity` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  teamcity: {
    options: {
      // Task-specific options go here.
    },
    all: {}
  }
})
```

### Options

#### options.suppressGruntLog
Type: `Boolean`
Default value: `false`

A boolean that when true will suppress the grunt log output - only the TeamCity service message will be sent to the console.

#### options.status
Type: `Object`
Default value:
```js
{
  warning: 'ERROR',
  failure: 'FAILURE',
  error: 'ERROR'
}
```

A hash that maps grunt log message types to [TeamCity service message statuses](http://confluence.jetbrains.com/display/TCD8/Build+Script+Interaction+with+TeamCity#BuildScriptInteractionwithTeamCity-ReportingMessagesForBuildLog). Note that the TeamCity 'WARNING' status does not flag a task as failed.

### Usage Examples

#### Default Options
Default options are normally all you need so no config section is required. Make sure that you include the teamcity as the first task so that the messaging is setup for all subsequent tasks. In this example we run concat as the default task but set the teamcity logging first.

```js
grunt.registerTask('default', ['teamcity', 'concat']);

grunt.initConfig({
  teamcity: {
    all: {} // need a task even if its an empty one
  }
})
```
As grunt-teamcity is a multitask you need to define at least one subtask, e.g. `all`

#### Custom Options
In this example, custom options are used to turn off the normal grunt logs for warning, fail and error. We have also redefined the status hash to report grunt warnings as Teamcity warnings (so they don't cause the task to fail).

```js
grunt.initConfig({
  teamcity: {
    options: {
      suppressGruntLog: true,
      status: {
        warning: 'WARNING',
        failure: 'FAILURE',
        error: 'ERROR'
      }
    }
  },
  concat: {
    //...
  }
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

[See the changelog](./CHANGELOG.md)
