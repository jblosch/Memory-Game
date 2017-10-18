$(function() {

  /**
    @description Randomly assigns the card images in the grid of cards
    @param {array} Contains a list of string names of each PNG file
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

  // Event listener for clicking on the card
  $('.card').on('click', function(){
    const self = $(this);

    // Creates a horizontal flip animation
    if( self.children('div').hasClass('closed') && compareCards.length < 2 ) {
      self.toggleClass('card-flip');
      setTimeout(function(){
        self.children('div').removeClass('closed');
        self.removeClass('card-flip');
      }, 200);
    }
  });

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

  shuffleCards(baseDeck, $('.pic img'));

});
