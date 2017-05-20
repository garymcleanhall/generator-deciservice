'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the slick ' + chalk.red('generator-muservice') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the resource name?',
        require: true
      },
      {
        type: 'checkbox',
        name: 'operations',
        choices: ['create', 'read', 'update', 'list', 'delete'],
        message: 'What operations does this resource provide?',
        require: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const name = this.props.name;
    const namePlural = `${name}s`;
    const operations = this.props.operations.reduce((accumulator, current) => {
      accumulator[current] = true;
      return accumulator;
    }, {});
    this.fs.copyTpl(
      this.templatePath('route-resource.js'),
      this.destinationPath(`src/routes/${namePlural}.js`),
      {name, namePlural, operations}
    );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
