
const program = require('commander');
const auth = require('./src/libs/auth');

program
    .command('list [uid]')
    .alias('l')
    .description('Retrieves a list of user(s).')

    .action( (uid) => auth.list(uid));

program
    .command('create')
    .alias('c')
    .description('Create a new Firebase Authentication user.')

    .option('-e, --email [value]', 'Email for the user')
    .option('-p, --password [value]', 'Password for the user')
    .option('-d, --displayName [value]', 'Display name for the user')
    .option('--emailVerified [boolean]', 'Email verified for the user')
    .option('---disabled [boolean]', 'Disabled for the user')
    .option('--photoURL [value]', 'Photo url for the user')
    .option('--phoneNumber [value]', 'Phone number for the user')

    .action( (options) => auth.create(options) );

program
    .command('update <uid>')
    .alias('u')
    .description('Updates an existing user by their uid.')
    
    .option('-e, --email [value]', 'New email for the user')
    .option('-p, --password [value]', 'New password for the user')
    .option('-d, --displayName [value]', 'New display name for the user')
    .option('--emailVerified [boolean]', 'Set email verified for the user')
    .option('--disabled [boolean]', 'Set disabled for the user')
    .option('--photoURL [value]', 'New photo url for the user')
    .option('--phoneNumber [value]', 'New phone number for the user')

    .action( (uid, options) => auth.update(uid, options) );

program
    .command('delete <uid>')
    .alias('d')
    .description('Delete a existing user by their uid')

    .action( (uid) => auth.remove(uid));
 

program
    .command('validate-email <uid>')
    .alias('v')
    .description('Validates email to existing user. Shorthand to user update <uid> --emailVerified.')

    .action( (uid) => auth.update(uid, {emailVerified: true}) );

program.parse(process.argv);
