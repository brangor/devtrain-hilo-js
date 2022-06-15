#!/usr/bin/env node

let prompt = require('prompt-sync')();

const RANDOM_VAL_MIN = 1;
const RANDOM_VAL_MAX = 100;
const MAX_GUESSES = 6;

let intro_text = [
  '~~~~~~~~~~~HI~~~LO~~~~~~~~~~~',
  '',
  ' Aim of the game:',
  `  • I'll pick a number between ${RANDOM_VAL_MIN} and ${RANDOM_VAL_MAX}`,
  `  • You'll be able to guess the mystery number ${MAX_GUESSES} times`,
  `  • I'll let you know whether you're HI or LO compared to the actual number`
];

const END_TEXT = [
  '',
  ' Thanks for Playing!     ',
  '~~~~~~~~~~~HI~~~LO~~~~~~~~~~~'
]

const NEXT_GUESS_PROMPT_TEXT = " GUESS: ";
const GUESS_IS_LOW_TEXT =   '  • LO';
const GUESS_IS_HIGH_TEXT =  '  • HI';

let mystery_number = Math.floor(
    Math.random() * RANDOM_VAL_MAX
  ) + RANDOM_VAL_MIN;

let game_won = false

let guess_history = []

for (var line of intro_text) { console.log(line) }

while (game_won === false && guess_history.length < MAX_GUESSES) {
  console.log('');
  let guess = prompt(NEXT_GUESS_PROMPT_TEXT);

  if (guess > mystery_number) {
    console.log(GUESS_IS_HIGH_TEXT);
  } else if (guess < mystery_number) {
    console.log(GUESS_IS_LOW_TEXT);
  } else if (guess === mystery_number) {
    game_won = true;
  } else {
    console.log("ERROR ERROR ERROR ERROR ERROR");
    break;
  }

  guess_history.push(guess);
}

let outro_text = [];
if (game_won) {
  outro_text = [
    '',
    ' You guessed it!',
    ` Wowzers, it took you ${guess_history.length} tries.`
  ];
} else {
  outro_text = [
    '',
    ' Bzzzzt! Game over.',
    ` You should have guessed ${mystery_number}, that was it the whole time.`
  ];
}

for (var line of outro_text) { console.log(line) }

for (var line of END_TEXT) { console.log(line) }
