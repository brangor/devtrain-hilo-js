#!/usr/bin/env node

let prompt = require('prompt-sync')({
  sigint: true,
});

const RANDOM_VAL_MIN = 1;
const RANDOM_VAL_MAX = 100;
const MAX_GUESSES = 6;

let intro_text = [
  '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~HI~~~LO~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  '',
  ' Aim of the game:',
  `  ~ I'll pick a number between ${RANDOM_VAL_MIN} and ${RANDOM_VAL_MAX}`,
  `  ~ You'll be able to guess the mystery number ${MAX_GUESSES} times`,
  `  ~ I'll let you know whether you're HI/LO compared to the actual number`
];

let END_TEXT = [
  '',
  ' Thanks for Playing!     ',
  '',
  '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~HI~~~LO~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
]

const NEXT_GUESS_PROMPT_TEXT = " GUESS ≈ ";
const GUESS_IS_LOW_TEXT =   '  ~ LO';
const GUESS_IS_HIGH_TEXT =  '  ~ HI';

let mystery_number = Math.floor(
    Math.random() * RANDOM_VAL_MAX
  ) + RANDOM_VAL_MIN;

let game_won = false;

let guess_history = [];

for (var line of intro_text) { console.log(line) }

while (!game_won && guess_history.length < MAX_GUESSES) {
  console.log('');

  let guess = parseInt(prompt(` GUESS #${guess_history.length + 1} ≈ `, -1));

  let valid = false
  while (!valid) {
    let issues = [];

    if (!Number.isInteger(guess)) {
      issues.push("Guess needs to be an integer.");
    }

    if (guess < 1 || guess > 100) {
      issues.push(`Guess outside range ${RANDOM_VAL_MIN}-${RANDOM_VAL_MAX}`);
    }

    if (guess_history.includes(guess)) {
      issues.push("Guess already done been guessed.");
    }

    if (issues.length == 0) {
      valid = true;
    } else {
      for(var issue of issues) { console.log('  ≈ERROR≈ ' + issue) }
      console.log('');
      guess = parseInt(prompt(`  GUESS #${guess_history.length + 1} ≈ `, -1));
    }
  }
  // validation end

  if (guess > mystery_number) {
    console.log(GUESS_IS_HIGH_TEXT);
  } else if (guess < mystery_number) {
    console.log(GUESS_IS_LOW_TEXT);
  } else if (guess == mystery_number) {
    game_won = true;
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
