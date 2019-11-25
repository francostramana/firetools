"use strict";

const admin = require("firebase-admin");
const inquirer = require("inquirer");
const view = require('../views/auth.view');
const environment = require('../environment');

const Conf = require('conf'); 
const config = new Conf();


const serviceAccount = require(config.get(environment.KEY_CREDENTIAL_PATH));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${config.get(environment.KEY_APLICATION_NAME)}.firebaseio.com`
});

/**
 * List user from Authorization. If pass a UID only list one.
 * 
 * @param {string} uid 
 */
function list(uid) {
    if (uid)
        _listUser(uid);
    else
        _listAllUsers();
}

function create(options) {
    let properties = _getUserPropertiesFromOptions(options);

    admin.auth().createUser(properties)
        .then(function(userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log('Successfully created new user:', userRecord.uid);
        })
        .catch(function(error) {
          console.log('Error creating new user:', error.errorInfo || error);
        })
        .finally(e => process.exit(1));
}

function update(uid, options) {
    let properties = _getUserPropertiesFromOptions(options);

    admin.auth().updateUser(uid, properties)
        .then(userRecord => {
            console.log("Successfully updated user", userRecord.toJSON());
        })
        .catch(error => {
            console.log("Error updating user:", error.errorInfo || error);
        })
        .then(e => process.exit(1));
}

async function remove(uid) {

    let answers = await inquirer.prompt([ { type: 'confirm', name: 'confirm', message: 'Are you sure you want to delete this user?', default: true }]);
    
    if (!answers.confirm) process.exit(1);

    admin.auth().deleteUser(uid)
        .then(() => {
            console.log('Successfully deleted user');
        })
        .catch(error => {
            console.log('Error deleting user:', error.errorInfo || error);
        })
        .finally(e => process.exit(1));
}

function _getUserPropertiesFromOptions(options) {
    return {
        ...(options.email           && {email: options.email}),
        ...(options.emailVerified   && {emailVerified: options.emailVerified}),
        ...(options.phoneNumber     && {phoneNumber: options.phoneNumber}),
        ...(options.password        && {password: options.password}),
        ...(options.displayName     && {displayName: options.displayName}),
        ...(options.photoURL        && {photoURL: options.photoURL}),
        ...(options.disabled        && {disabled: options.disabled}),
    };
    // FIXME: some properties can be null!
}

function _listUser(uid) {
    admin.auth().getUser(uid)
        .then(userRecord =>  {
            view.printUsers([userRecord]);
        })
        .catch(error =>  {
            console.log("Error fetching user data:", error.errorInfo || error);
        })
        .finally(e => process.exit(1));
}

function _listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
        .then(listUsersResult => {

            if (listUsersResult.users.length)
                view.printUsers(listUsersResult.users);
            
            if (listUsersResult.pageToken) {
                // List next batch of users.
                _listAllUsers(listUsersResult.pageToken);
            }
        })
        .catch(error =>  {
            console.log("Error listing users:",  error.errorInfo || error);
        })
        .finally(e => process.exit(1));
}


// Export all public methods
module.exports = {
    list, 
    create,
    update, 
    remove
};