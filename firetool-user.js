
const program = require('commander');

const auth = require('./app/controllers/UserController');

program
    .command('list [uid]')
    .alias('l')
    .description('Retrieves a list of user(s)')
    .action( (uid) => auth.list(uid));

program
    .command('update <uid>')
    .alias('u')
    .description('Updates an existing user')
    .option('-p, --password [value]', 'New password for the user')
    .action( (uid, cmd) => console.log(cmd.password) );


program
    .command('validate-email <uid>')
    .alias('v')
    .description('Validates email to existing user')
    .action( (uid) => auth.validateEmail(uid) );

program.parse(process.argv);