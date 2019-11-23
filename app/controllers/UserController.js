const admin = require("firebase-admin");
const view = require('../views/UserView');


//const serviceAccount = require("./cuthill-digital-firebase-adminsdk-3juik-c6920cf51a.json");
//onst serviceAccount = require("../../config/cuthill-beta-firebase-adminsdk-8qiim-b94471293d.json");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://cuthill-digital-dev.firebaseio.com"
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
          console.log('Error creating new user:', error.errorInfo);
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
            console.log("Error updating user:",  error.errorInfo);
        })
        .then(e => process.exit(1));
}

function remove(uid) {
    admin.auth().deleteUser(uid)
        .then(() => {
            console.log('Successfully deleted user');
        })
        .catch(error => {
            console.log('Error deleting user:',  error.errorInfo);
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
            console.log("Error fetching user data:", error.errorInfo);
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