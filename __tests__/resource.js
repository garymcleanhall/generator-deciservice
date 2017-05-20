'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-deciservice:resource', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/resource'))
      .withPrompts({
        name: 'user',
        type: 'collection',
        operations: [
          'create',
          'read',
          'delete'
        ]
      });
  });
  it('creates plural file for collections', () => {
    assert.file([
      'src/routes/users.js'
    ]);
  });
});

describe('generator-deciservice:resource', () => {
  beforeEach(() => {
    return helpers.run(path.join(__dirname, '../generators/resource'))
      .withPrompts({
        name: 'user',
        type: 'document',
        operations: [
          'read',
          'delete'
        ]
      });
  });
  it('creates singular file for document', () => {
    assert.file([
      'src/routes/user.js'
    ]);
  });
});
