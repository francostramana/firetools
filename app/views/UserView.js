const Table = require('cli-table');

function printUsers(users) {

    let table = new Table({
        head: ['email', 'uid', 'creationTime', 'lastSignInTime', 'emailVerified', 'disabled']
    });

    users.forEach( userRecord =>  table.push([
        userRecord.email,
        userRecord.uid,
        userRecord.metadata.creationTime,
        userRecord.metadata.lastSignInTime,
        userRecord.emailVerified,
        userRecord.disabled
    ]));
    console.log(table.toString());

}

module.exports = {printUsers}