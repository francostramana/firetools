const program = require('commander');



/*
  //validateEmail("K2rk7Hqk1NbNZ02sZu5BTxMAuVy1");
  updatePassword("Id2U4Vh1VpZiAxwsYbsWtcSgdDt2", "ccuthill2019");
  listAllUsers();*/



program
    .version('1.0.0')
    .description('Admin Tools CLI for Firebase')
    .command('user', 'Tools for User Administrator').alias('u')
    .parse(process.argv);




