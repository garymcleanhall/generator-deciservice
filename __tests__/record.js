'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-deciservice:record', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/record'))
      .withOptions({
        envs: 'local,live'
      })
      .withPrompts({
        name: 'user'
      });
  });

  it('creates files', () => {
    assert.file([
      'src/config/local/data/user.json',
      'src/config/live/data/user.json',
      'src/data/user.js',
      'src/data/userSchema.js'
    ]);

    assert.noFileContent([
      ['src/config/local/data/user.json', '<%'],
      ['src/config/live/data/user.json', '<%'],
      ['src/data/userSchema.js', '<%'],
      ['src/data/user.js', '<%']
    ]);
  });
});

