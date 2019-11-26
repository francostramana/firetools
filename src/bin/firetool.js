#!/usr/bin/env node

"use strict";

const program = require('commander');


// Sub-Commands git-style
program
.command('init', 'Init Firebase Tools', {executableFile: '../commands/init.js'}).alias('i')
.command('user', 'Tools for User Administrator', {executableFile: '../commands/user.js'}).alias('u')

program
    .version('1.0.0')
    .description('Admin Tools CLI for Firebase')
    .parse(process.argv);
