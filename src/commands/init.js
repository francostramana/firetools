"use strict";

const program = require('commander');
const init = require('../libs/init');


program
  .action(() => init.init());

program.parse(process.argv);
