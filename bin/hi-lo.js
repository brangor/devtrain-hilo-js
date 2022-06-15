#!/usr/bin/env node

let prompt = require('prompt-sync')({
  sigint: true,
});

const RANDOM_VAL_MIN = 1;
const RANDOM_VAL_MAX = 100;
const MAX_GUESSES = 6;

let introText = [
  '\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~HI~~~LO~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  '\n Aim of the game:',
  `  ~ I'll pick a number between ${RANDOM_VAL_MIN} and ${RANDOM_VAL_MAX}`,
  `  ~ You'll be able to guess the mystery number ${MAX_GUESSES} times`,
  `  ~ I'll let you know whether you're HI/LO compared to the actual number`
];

let endText = [
  '\n Thanks for Playing!',
  '\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~HI~~~LO~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
]

const NEXT_GUESS_PROMPT_TEXT = " GUESS ≈ ";
const GUESS_IS_LOW_TEXT =   '  ~ LO';
const GUESS_IS_HIGH_TEXT =  '  ~ HI';

let mysteryNumber = Math.floor(
    Math.random() * RANDOM_VAL_MAX
  ) + RANDOM_VAL_MIN;

let gameWon = false;
let guessHistory = [];

for (var line of introText) { console.log(line) }

while (!gameWon && guessHistory.length < MAX_GUESSES) {
  let promptText = ` GUESS #${guessHistory.length + 1} ≈ `;

  console.log();
  let guess = prompt(promptText, -1);

  let valid = false
  while (!valid) {
    let issues = [];

    let numbersOnlyRegExp = new RegExp('^-?[0-9]*$');
    if (!numbersOnlyRegExp.test(guess)) {
      issues.push("Guess must be an integer.");
    } else {
      guess = parseInt(guess);
    }

    if (guess < RANDOM_VAL_MIN || guess > RANDOM_VAL_MAX) {
      issues.push(`Guess outside range ${RANDOM_VAL_MIN}-${RANDOM_VAL_MAX}`);
    }

    if (guessHistory.includes(guess)) {
      issues.push("Guess already done been guessed.");
    }

    if (issues.length == 0) {
      valid = true;
    } else {
      for(var issue of issues) { console.log('  ≈ERROR≈ ' + issue) }
      console.log()
      guess = prompt(promptText, -1);
    }
  }

  if (guess > mysteryNumber) {
    console.log(GUESS_IS_HIGH_TEXT);
  } else if (guess < mysteryNumber) {
    console.log(GUESS_IS_LOW_TEXT);
  } else if (guess == mysteryNumber) {
    gameWon = true;
  }

  guessHistory.push(guess);
}

let outroText = ( gameWon ? [
    '\n You guessed it!',
    ` Wowzers, it took you ${guessHistory.length} tries.`
  ] : [
    '\n Bzzzzt! Game over.',
    ` You should have guessed ${mysteryNumber}, that was it the whole time.`
  ]);

for (var line of outroText) { console.log(line) }
for (var line of endText) { console.log(line) }
