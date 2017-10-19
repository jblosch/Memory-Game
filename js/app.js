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
  let movesCount = 0;
  let winCount = 0;

  /**
    @description Randomly assigns the card images in the grid of cards
    @param {array} baseAry - A list of string names of each PNG file
    @param {object} destination - The object to add the image string to
  */

  function shuffleCards(baseAry, destination) {
    let shuffledDeck = [];
    while(baseAry.length) {
      let randomImage = Math.ceil(Math.random() * baseAry.length - 1);
      shuffledDeck.push(baseAry[randomImage]);
      baseAry.splice(randomImage, 1);
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

  // Event listener for clicking on the card
  $('.card').on('click', function() {
    console.log();
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
            winCount++;
            compareCards = [];
          } else {
            movesCount++;
            $('#moves').text(movesCount);
            cardFlip($(compareCards[0]), false);
            cardFlip($(compareCards[1]), false);
            compareCards = [];
          }
        }, 800);

      }
    }
  });

  shuffleCards(baseDeck, $('.pic img'));

});
