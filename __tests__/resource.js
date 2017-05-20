'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-muservice:resource', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/resource'))
      .withPrompts({
        name: 'user',
        operations: [
          'create',
          'read',
          'delete'
        ]
      });
  });

  it('creates files', () => {
    assert.file([
      'src/routes/users.js'
    ]);
  });
});
