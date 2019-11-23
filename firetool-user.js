
const program = require('commander');
const auth = require('./app/controllers/UserController');

program
    .command('list [uid]')
    .alias('l')
    .description('Retrieves a list of user(s).')

    .action( (uid) => auth.list(uid));

program
    .command('update <uid>')
    .alias('u')
    .description('Updates an existing user by their uid.')
    
    .option('-e, --email [string]', 'New email for the user')
    .option('-v, --emailVerified [boolean]', 'Set email verified for the user')
    .option('-p, --password [string]', 'New password for the user')
    .option('-n, --displayName [string]', 'New display name for the user')
    .option('-d --disabled [boolean]', 'Set disabled for the user')
    .option('--photoURL [string]', 'New photo url for the user')
    .option('--phoneNumber [string]', 'New phone number for the user')

    .action( (uid, options) => auth.update(uid, options) );

program
    .command('delete <uid>')
    .alias('d')
    .description('Delete a existing user by their uid')

    .action( (uid) => auth.remove(uid));
 

program
    .command('validate-email <uid>')
    .alias('v')
    .description('Validates email to existing user. Shorthand to update <uid> --emailVerified=true.')

    .action( (uid) => auth.update(uid, {emailVerified: true}) );

program.parse(process.argv);