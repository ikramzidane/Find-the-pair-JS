(function(){


  var cardsSetup = {
    init: function(){
      var arr = this.gameArray;
      this.shuffle(arr);
      $('div.card').each(function(i,value){
        $(this).attr( 'data-key' , arr[i] );
      });
    },

    gameArray : [ 
      "dog", "dog",
      "monkey", "monkey",
      "chicken", "chicken",
      "penguin", "penguin",
      "tiger", "tiger",
      "fox", "fox",
      "owl", "owl",
      "pig", "pig",
      "cow", "cow",
    ],

    // Fisher–Yates Shuffle
    // More at: http://bost.ocks.org/mike/shuffle/
    shuffle: function(array) {
      var m = array.length, t, i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    }
  }


  var flipGame = {    
    container     : $('.game-container'),
    totalPair     : $('div.card').length / 2,

    firstPickVal  : undefined,
    secondPickVal : undefined,

    totalmoves    : 0,
    matchingPair  : 0,

    init: function(){
      this.container.on('click', '.card', function(e){
        var $this = $(this);
        var noCardFlip = $('.game-container  [data-reveal="yes"]').length; 

        if( noCardFlip == 0 && !$this.hasClass('hover') ) {
          flipGame.firstClick.call(this);
        } else if( noCardFlip == 1 && !$this.hasClass('hover')) {
          flipGame.secondClick.call(this);
          flipGame.checkPair();
          flipGame.totalmoves >= flipGame.totalPair && flipGame.checkForWin();
        }
        
        e.stopPropagation();
      });
    },

    checkForWin: function(){
      this.matchingPair == this.totalPair && this.victory();
    },

    victory: function(){
      $('.total-move').text(this.totalmoves);

      $('.winning-msg').show().addClass('reveal').on('click', function(e){
        setTimeout(function(){ 
          cardsSetup.init.call(cardsSetup); flipGame.init.call(flipGame);
        }, 300);
        $(this).removeClass('reveal');
        $('.card').removeClass('hover');
      });

      this.reinit();
    },

    reinit: function(){
      this.firstPickVal = undefined;
      this.secondPickVal = undefined;
      this.totalmoves = 0;
      this.matchingPair = 0;
    },

    checkPair: function() {
      if(this.firstPickVal == this.secondPickVal) {
        flipGame.container.find('[data-reveal="yes"]').attr('data-reveal', '')
        this.matchingPair++;
      } else {
        setTimeout(function(){ 
          flipGame.container.find('[data-reveal="yes"]').removeClass('hover').attr('data-reveal', ''); 
        }, 1500);
      }
      this.totalmoves++
    },

    firstClick: function(){
      var firstCard = $(this);
      firstCard.addClass('hover').attr('data-reveal', 'yes');
      flipGame.firstPickVal = firstCard.attr('data-key');
    },

    secondClick: function() {
      var secondCard = $(this);
      secondCard.addClass('hover').attr('data-reveal', 'yes');
      flipGame.secondPickVal = secondCard.attr('data-key');
    }
  };


  // On DOM load
  $('.center-circle').on('click', function(e){
    $('body').addClass('ingame');
    cardsSetup.init();
    flipGame.init();
  });


})();