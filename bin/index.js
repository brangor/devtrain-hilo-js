#!/usr/bin/env node

var prompt = require('prompt-sync')();

var n = prompt("How many more times? ");

const greeting = `Hello, ${n}!`;

console.log(greeting);
