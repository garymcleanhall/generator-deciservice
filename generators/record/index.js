'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);

    this.option('envs', {type: raw => (raw.split(','))});
  }

  prompting() {
    // Have Yeoman greet the user.
    if (!this.options.nested) {
      this.log(yosay(
        'Welcome to the astounding ' + chalk.red('generator-deciservice') + ' generator!'
      ));
    }

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of this new record?',
      required: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const templateParams = Object.assign(this.props, this.options);
    templateParams.nameCapitalized = templateParams.name.charAt(0).toUpperCase() + templateParams.name.slice(1);
    this.fs.copyTpl(
      this.templatePath('record.js'),
      this.destinationPath(`src/data/${this.props.name}.js`),
      templateParams
    );
    this.fs.copyTpl(
      this.templatePath('recordSchema.js'),
      this.destinationPath(`src/data/${this.props.name}Schema.js`),
      templateParams
    );
    this.options.envs.forEach(env => {
      this.fs.copyTpl(
        this.templatePath('record-config.json'),
        this.destinationPath(`src/config/${env}/data/${this.props.name}.json`),
        templateParams
      );
    });
  }

  install() {
    this.installDependencies();
  }
};
