$(function() {

  const baseDeck = [
    'baseball', 'baseball',
    'book', 'book',
    'cocktails', 'cocktails',
    'helmet', 'helmet',
    'hourglass', 'hourglass',
    'paper_plane', 'paper_plane',
    'recycling', 'recycling',
    'synthesizer', 'synthesizer'
  ];
  let compareCards = [];
  let clickCount = 0;
  let movesCount = 0;
  let winCount = 0;
  let seconds = 0;
  let minutes = 0;
  let stopTimer = false;

  /**
    @description Randomly assigns the card images in the grid of cards
    @param {array} baseAry - A list of string names of each PNG file
    @param {object} destination - The object to add the image string to
  */

  function shuffleCards(baseAry, destination) {
    let shuffledDeck = [];
    let tempArray = baseDeck.slice();
    while(tempArray.length) {
      let randomImage = Math.ceil(Math.random() * tempArray.length - 1);
      shuffledDeck.push(tempArray[randomImage]);
      tempArray.splice(randomImage, 1);
    }
    for(let i = 0; i < destination.length; i++) {
      $(destination[i]).attr('src', 'img/' + shuffledDeck[i] + '.png');
    }
  }

  /**
    @description Flips the cards horizontally; opens or closes
    @param {object} el - The DOM element that will be flipped
    @param {boolean} reveal - Determines whether to open the card or close it
  */

  function cardFlip(el, reveal) {
    el.addClass('card-flip');
    setTimeout(function(){
      if(reveal) {
        el.children('div').removeClass('closed');
      } else {
        el.children('div').addClass('closed');
      }
      el.removeClass('card-flip');
    }, 200);
  }

  /**
    @description Removes stars from rank after a certain number of moves
  */

  function ratingChange() {
    const star2 = document.getElementById('rank').childNodes[3];
    const star3 = document.getElementById('rank').childNodes[5];

    if(movesCount > 1 && movesCount < 17) {
      $(star3).removeClass('fa-star');
      $(star3).addClass('fa-star-o');
    } else if(movesCount >= 17) {
      $(star3).removeClass('fa-star');
      $(star3).addClass('fa-star-o');
      $(star2).removeClass('fa-star');
      $(star2).addClass('fa-star-o');
    }
  }

  /**
    @description Runs a timer of minutes/seconds, counting up
  */

  function timer() {
    seconds++;
    if(seconds === 60) {
      minutes++;
      seconds = 0;
    }

    document.getElementById('minutes').innerHTML = minutes <= 9 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerHTML = seconds <= 9 ? '0' + seconds : seconds;
  }

  /**
    @description Checks to see if if the player won the game and if so,
    generates the modal
  */

  function didYouWin() {
      if(winCount === 1) {
        stopTimer = true;
        $('.overlay').css('display', 'block');
        $('body').css('position', 'fixed');
        $('#final-score li:first-child').append($('#rank').clone());
        $('#final-score li:last-child').append($('#timer').clone());
      }
  }

  /**
    @description Resets game to initial state
  */

  function restart() {
    $('.overlay').css('display', 'none');
    $('body').css('position', 'static');
    $('.container').find('.pic').addClass('closed');
    shuffleCards(baseDeck, $('.pic img'));
    stopTimer = true;
    compareCards = [];
    clickCount = 0;
    movesCount = 0;
    winCount = 0;
    seconds = 0;
    minutes = 0;
    document.getElementById('main-score').childNodes[1].childNodes[3].childNodes[3].className = 'fa fa-star';
    document.getElementById('main-score').childNodes[1].childNodes[3].childNodes[5].className = 'fa fa-star';
    document.getElementById('main-score').childNodes[3].childNodes[3].childNodes[1].innerHTML = "00";
    document.getElementById('main-score').childNodes[3].childNodes[3].childNodes[3].innerHTML = "00";
    document.getElementById('moves').innerHTML = '0';
    $('.container').animate({opacity: '0'}, "slow");
    $('.container').animate({opacity: '1'}, "slow");
  }

  // Event listener for clicking on the card
  $('.card').on('click', function() {
    clickCount++;
    if(clickCount === 1) {
      if(stopTimer === false) { timer(); };
      let tick = setInterval(function() {
        if(stopTimer) {
          clearInterval(tick);
        } else {
          timer();
        }
      }, 1000);
    }
    const self = $(this);
    // Creates a horizontal flip animation
    if(self.children('div').hasClass('closed') && compareCards.length < 2) {
      cardFlip(self, true);

      // Pushes selected cards into array to compare
      compareCards.push(self);

      // Compares the cards and generates consequences
      if(compareCards.length === 2) {
        setTimeout(function() {
          let first = compareCards[0][0].childNodes[1].childNodes[1].getAttribute('src');
          let second = compareCards[1][0].childNodes[1].childNodes[1].getAttribute('src');
          if(first === second) {
            movesCount++;
            $('#moves').text(movesCount);
            ratingChange();
            winCount++;
            didYouWin();
            compareCards = [];
          } else {
            movesCount++;
            ratingChange();
            $('#moves').text(movesCount);
            cardFlip($(compareCards[0]), false);
            cardFlip($(compareCards[1]), false);
            compareCards = [];
          }
        }, 800);
      }
    }
  });

  // Clicking on 'Play Again' button restarts the game
  $('#new-game').on('click', function() {
    restart();
  });

  // Clicking on restart icon restarts the game
  $('#restart').on('click', function() {
    restart();
  });
  shuffleCards(baseDeck, $('.pic img'));
});
