'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  prompting() {
    if (!this.options.nested) {
      this.log(yosay(
      'Welcome to the slick ' + chalk.red('generator-deciservice') + ' generator!'
      ));
    }

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the resource name?',
        require: true
      },
      {
        type: 'list',
        name: 'type',
        choices: ['collection', 'store', 'document', 'controller'],
        message: 'What type of resource is this?',
        default: 'collection',
        require: true
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      let operationsPrompt = {
        type: 'checkbox',
        name: 'operations',
        message: 'What operations does this resource provide?',
        require: true
      };
      switch (this.props.type) {
        case 'collection': {
          operationsPrompt.choices = [
            'create', 'read', 'update', 'list', 'delete'
          ];
          operationsPrompt.default = operationsPrompt.choices;
          break;
        }
        case 'store': {
          operationsPrompt.choices = [
            'create', 'read', 'update', 'list', 'delete'
          ];
          operationsPrompt.default = operationsPrompt.choices;
          break;
        }
        case 'document': {
          operationsPrompt.choices = [
            'read', 'update', 'delete'
          ];
          operationsPrompt.default = operationsPrompt.choices;
          break;
        }
        default: {
          this.props.operations = [];
          return;
        }
      }
      return this.prompt([operationsPrompt]).then(props => {
        this.props.operations = props.operations;
      });
    });
  }

  writing() {
    const name = this.props.name;
    const type = this.props.type;
    const namePlural = `${name}s`;
    const operations = this.props.operations.reduce((accumulator, current) => {
      accumulator[current] = true;
      return accumulator;
    }, {});
    const fileName = ['collection', 'store'].find(x => (type === x)) ? namePlural : name;
    this.fs.copyTpl(
      this.templatePath(`route-resource-${type}.js`),
      this.destinationPath(`src/routes/${fileName}.js`),
      {name, namePlural, operations}
    );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
