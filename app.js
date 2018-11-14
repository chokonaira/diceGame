/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
//The init function to reset the game is down
init();

document.querySelector('.btn-roll').addEventListener('click', function(){
  if (gamePlaying){
      //get random number 
      dice = Math.floor(Math.random() * 6) + 1;
      //change display
      var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';
      //update the roundscore if the rolled number was not 1
      if (dice !== 1){
        //addscore
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
        //Next player
      nextPlayer();
      }

  }

});

//initializing the hold button

document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gamePlaying) {
          //add current score to global score
        scores[activePlayer] += roundScore;


        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won
        if (scores[activePlayer] >= 100){
          document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
          document.querySelector('.dice').style.display = 'none';
          document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
          document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
          gamePlaying = false;
        } else {
          //next player
        nextPlayer();
        }
    }
})


function nextPlayer(){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  //change content to zero if player rolls a one
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  //change active player
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //hide dice before switch if player rolls 1
  document.querySelector('.dice').style.display ='none';
  
}

//initializing the New Game buton
document.querySelector('.btn-new').addEventListener('click', init);

//The init function to reset the game
function init (){
scores = [0,0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;

document.querySelector('.dice').style.display = 'none';

//change value to 0
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');

}


//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';