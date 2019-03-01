const admin = require("firebase-admin");

const view = require('../views/UserView');


//const serviceAccount = require("./cuthill-digital-firebase-adminsdk-3juik-c6920cf51a.json");
const serviceAccount = require("../../config/cuthill-beta-firebase-adminsdk-8qiim-b94471293d.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: "https://cuthill.firebaseio.com"
    databaseURL: "https://cuthill-beta.firebaseio.com"
});


function validateEmail(uid) {
    admin.auth().updateUser(uid, {
        emailVerified: true,
    })
        .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully updated user", userRecord.toJSON());
        })
        .catch(function(error) {
            console.log("Error updating user:", error);
        });
}

function listAllUsers(nextPageToken) {

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

function listUser(uid) {
    admin.auth().getUser(uid)
        .then(function(userRecord) {
            view.printUsers([userRecord]);
        })
        .catch(function(error) {
            console.log("Error fetching user data:", error);
        });
}



function updatePassword(uid, password) {
    admin.auth().updateUser(uid, {
        password: password,
    })
        .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully updated user", userRecord.toJSON());
        })
        .catch(function(error) {
            console.log("Error updating user:", error);
        });
}

function list(uid) {
    if (uid)
        listUser(uid);
    else
        listAllUsers();
}

// Export all methods
module.exports = { list, validateEmail };