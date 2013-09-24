# grunt-teamcity

> Send gruntjs log warnings in TeamCity service message format.

## Getting Started
This plugin requires Grunt `~0.4.1`

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
    }
  },
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

A hash that maps grunt log message types to [TeamCity service message statuses](http://confluence.jetbrains.com/display/TCD7/Build+Script+Interaction+with+TeamCity#BuildScriptInteractionwithTeamCity-ReportingMessagesForBuildLog). Note that the TeamCity 'WARNING' status does not flag a task as failed.

### Usage Examples

#### Default Options
Default options are normally all you need. Make sure that you include the teamcity as the first task so that the messaging is setup for all subsequent tasks

```js
grunt.registerTask('default', ['teamcity', 'concat']);

grunt.initConfig({
  teamcity: {
    options: {}
  },
  concat: {
    //...
  }
})
```

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

## Windows users

Teamcity on windows does not flush the stdout stream before exiting the grunt node process. There has been some work around this in both nodejs and grunt, but it is by no means resolved. If you see missing output in your Teamcity build log then try running the grunt task using the TC command line runner by redirecting output to a file, e.g:
```shell
grunt default --no-color > grunt.tmp & type grunt.tmp & del grunt.tmp
```
Seems that by redirecting to a file the output is synchronous, whereas with pipe (or TC plugin execute method) the output is async and not captured before the node process exits.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
