$(function() {

  /**
    @description Randomly assigns the cards in the grid
    @param {array} Contains a list of strings that name the png file
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

  shuffleCards(baseDeck, $('.pic img'));

});
