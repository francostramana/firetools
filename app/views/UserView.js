const Table = require('cli-table');

function printUsers(users) {
    let table = new Table({
        head: ['uid', 'email', 'displayName', 'emailVerified', 'disabled']
    });

    users.forEach( userRecord =>  table.push([
        userRecord.uid,
        userRecord.email,
        userRecord.displayName || "",
        userRecord.emailVerified,
        userRecord.disabled
    ]));
    console.log(table.toString());
}

module.exports = {printUsers}