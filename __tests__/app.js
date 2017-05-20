'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-deciservice:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        appName: 'my-app',
        includeHealthcheck: true,
        resources: [],
        resource: false,
        environments: [
          'test',
          'live',
          'staging'
        ]
      });
  });

  it('creates files', () => {
    assert.file([
      'index.js',
      'src/config.js',
      'src/my-app.js',
      'src/config/config.test.json',
      'src/config/config.live.json',
      'src/config/config.staging.json',
      'src/routes/index.js',
      'src/routes/root.js',
      'src/routes/healthcheck.js',
      'package.json'
    ]);
  });
});
