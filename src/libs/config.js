"use strict";

const pkg = require("../../package.json");
const Conf = require('conf'); 

// Init a Configstore instance with an unique ID
module.exports = {
    store: new Conf({projectName: pkg.name}),
    preferences: Object.freeze({
        KEY_APLICATION_NAME: 'config-app-name',
        KEY_CREDENTIAL_PATH: 'config-credential-path'
    })
}