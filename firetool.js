#!/usr/bin/env node

"use strict";

const program = require('commander');
const inquirer = require('inquirer');
const environment = require('./src/environment');

const Conf = require('conf');
const config = new Conf();


const DATABASE_NAME_QUESTION = {
  type: "input",
  name: "databaseName",
  default: config.get(environment.KEY_APLICATION_NAME),
  message: "Enter Firebase Database Name: (Example https://<database-name>.firebaseio.com)",
};

const CREDENTIAL_PATH_QUESTION = {
  type: "input",
  name: "credentialPath",
  default: config.get(environment.KEY_CREDENTIAL_PATH),
  message: "Enter Firebase credentials path: (Example /home/user/downloads/name-adminsdk-id.json)",
};


program
  .command('init')
  .alias('i')
  .description('Init Firebase Tools.')
  .action(async (e)   => {
    let answers = await inquirer.prompt([DATABASE_NAME_QUESTION, CREDENTIAL_PATH_QUESTION]);

    config.set(environment.KEY_APLICATION_NAME, answers.databaseName);
    config.set(environment.KEY_CREDENTIAL_PATH, answers.credentialPath);

  });

program
    .version('1.0.0')
    .description('Admin Tools CLI for Firebase')
    .command('user', 'Tools for User Administrator').alias('u')
    .parse(process.argv);
