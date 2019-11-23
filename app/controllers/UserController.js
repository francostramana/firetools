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

function update(uid, options) {
    let properties = {
        ...(options.email           && {email: options.email}),
        ...(options.emailVerified   && {emailVerified: options.emailVerified}),
        ...(options.phoneNumber     && {phoneNumber: options.phoneNumber}),
        ...(options.password        && {password: options.password}),
        ...(options.displayName     && {displayName: options.displayName}),
        ...(options.photoURL        && {photoURL: options.photoURL}),
        ...(options.disabled        && {disabled: options.disabled}),
    };

    // FIXME: some properties can be null!
    
    _updateUser(uid, properties);
}

function remove(uid) {
    admin.auth().deleteUser(uid)
        .then(function() {
            console.log('Successfully deleted user');
        })
        .catch(function(error) {
            console.log('Error deleting user:', error);
        });
}

function _listUser(uid) {
    admin.auth().getUser(uid)
        .then(function(userRecord) {
            view.printUsers([userRecord]);
        })
        .catch(function(error) {
            console.log("Error fetching user data:", error);
        });
}

function _listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
        .then(function(listUsersResult) {

            if (listUsersResult.users.length)
                view.printUsers(listUsersResult.users);

            if (listUsersResult.pageToken) {
                // List next batch of users.
                listAllUsers(listUsersResult.pageToken);
            }
        })
        .catch(function(error) {
            console.log("Error listing users:", error);
        });
}

function _updateUser(uid, properties) {
    admin.auth().updateUser(uid, properties)
    .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully updated user", userRecord.toJSON());
    })
    .catch(function(error) {
        console.log("Error updating user:", error);
    });
}


// Export all methods
module.exports = {
    list, 
    update, 
    remove
};