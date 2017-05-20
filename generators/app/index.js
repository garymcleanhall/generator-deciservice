'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the well-made ' + chalk.red('generator-muservice') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'What is this μ-service called?',
        default: this.appname
      },
      {
        type: 'confirm',
        name: 'includeHealthcheck',
        message: 'Would you like to include a /healthcheck route and scaffolding?',
        default: true
      },
      {
        type: 'checkbox',
        name: 'environments',
        choices: ['local', 'dev', 'staging', 'beta', 'live', 'production', 'test'],
        message: 'Which environments would you like to support?',
        default: ['dev', 'test', 'staging', 'production']
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.props.resources = this.props.resources || [];
    this.props.testEnv = this.props.environments.some(env => (env === 'test'));
    this.props.includeMongo = this.props.resources.length > 0;

    this.fs.copyTpl(
      this.templatePath('app.js'),
      this.destinationPath(`src/${this.props.appName}.js`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('config.js'),
      this.destinationPath('src/config.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('route-index.js'),
      this.destinationPath('src/routes/index.js'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('route-root.js'),
      this.destinationPath('src/routes/root.js'),
      this.props
    );

    if (this.props.includeHealthcheck) {
      this.fs.copyTpl(
        this.templatePath('route-healthcheck.js'),
        this.destinationPath('src/routes/healthcheck.js'),
        this.props
      );
    }
    for (var i = 0; i < this.props.environments.length; i++) {
      var env = this.props.environments[i];
      this.fs.copyTpl(
        this.templatePath('config.env.json'),
        this.destinationPath(`src/config/config.${env}.json`),
        this.props
      );
    }
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
