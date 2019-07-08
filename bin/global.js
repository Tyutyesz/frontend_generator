#!/usr/bin/env node

const frontend = require('../lib/index');

if (process.argv[2] === 'init' && process.argv[3]) {
    frontend.init.init();
}

if ((process.argv[2] === 'c' && process.argv[3] === 'm')) {
    frontend.init.createModule(process.argv[4]);
}
