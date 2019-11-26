"use strict";

const inquirer = require("inquirer");
const config = require('./config');
const admin = require("firebase-admin");


const DATABASE_NAME_QUESTION = {
  type: "input",
  name: "databaseName",
  default: config.store.get(config.preferences.KEY_APLICATION_NAME),
  message: "Enter Firebase Database Name: (Example https://<database-name>.firebaseio.com)",
};

const CREDENTIAL_PATH_QUESTION = {
  type: "input",
  name: "credentialPath",
  default: config.store.get(config.preferences.KEY_CREDENTIAL_PATH),
  message: "Enter Firebase credentials path: (Example /home/user/downloads/name-adminsdk-id.json)",
};

const init = async () => {
    let answers = await inquirer.prompt([DATABASE_NAME_QUESTION, CREDENTIAL_PATH_QUESTION]);

    config.store.set(config.preferences.KEY_APLICATION_NAME, answers.databaseName);
    config.store.set(config.preferences.KEY_CREDENTIAL_PATH, answers.credentialPath);
}

const initializeApp = () => {
  try {
    const serviceAccount = require(config.store.get(config.preferences.KEY_CREDENTIAL_PATH));

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${config.store.get(config.preferences.KEY_APLICATION_NAME)}.firebaseio.com`
    });
  } catch(e) {
      console.log('Error on initialize firebase admin:', e);
      process.exit(1);
  } 
}

module.exports = {
    init: init,
    initializeApp: initializeApp
}