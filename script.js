'use strict';
//elements selection
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

//game initial conditions
let totalScores,currentScore,activePlayer,isPlaying;

const initGame = () => {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore = 0;
  totalScores = [0, 0]; //players score
  activePlayer = 0;

  isPlaying = true;

  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

initGame();

const switchActivePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//roll dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    //1.generate random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    //2.display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`; //+rep
    //3.if the number is 3,switch to next player
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

//save tottal score
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    //1.add current score to active player
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    //2.if total score of active player >=100, active player won,if not-switch player
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      switchActivePlayer();
    }
  }
});

btnNew.addEventListener('click', initGame());
