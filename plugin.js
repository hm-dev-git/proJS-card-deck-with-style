/*
 *  jquery-boilerplate - v3.4.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

  "use strict";

  var ranks = {
      ACE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      SIX: 6,
      SEVEN: 7,
      EIGHT: 8,
      NINE: 9,
      TEN: 10,
      JACK: 10,
      QUEEN: 10,
      KING: 10
    };


    var suits = {
      HEARTS: 'hearts',
      CLUBS: 'clubs',
      SPADES: 'spades',
      DIAMONDS: 'diamonds'
    };

    function makeDeck() {
        var deck = [];

        // { suit: 'HEARTS', rank: 'ACE' }
        Object.keys(suits).forEach(function(suit) {

            Object.keys(ranks).forEach(function(rank) {

                deck.push({ suit: suit, rank: rank });

            });

        });

        return deck;
    }

    function shuffle(array) {
      var m = array.length, t, i;

      // While there remain elements to shuffle…
      while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      return array;
    }

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "blackjack",
        defaults = {};

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        this.$element = $(element);
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.deck = makeDeck();
        this.hand = [];
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
              this.shuffle();
              // this.displayCard( this.deck[0] );
              this.displayDeck();

              var shuffleHTML = '<button class="shuffle">shuffle</button>';
              this.$element.find('.controls').append(shuffleHTML);
              this.$element.find('.shuffle').on('click', function() {
                this.shuffle();
                this.displayDeck();
              }.bind(this));

              this.deal(5);
              this.displayHand();
        },

        shuffle: function() {
            this.deck = shuffle( this.deck );
        },

        deal: function(howMany) {

          if (howMany > this.deck.length) {
              howMany = this.deck.length;
          }

          for(var i = 0; i < howMany; i++) {
            
            this.hand.push( this.deck.pop() );
          }
          // this.displayDeck();
          // console.log(this.deck.length);
        },

        displayCard: function(card, selector) {
            var rank = card.rank;
            var suit = card.suit;

            var cardHTML = 
                '<div class="card ' + rank.toLowerCase() + ' ' + suit.toLowerCase() + '">' + 
                    '<span class="rank">' + rank + '</span>' +
                        ' of ' + 
                    '<span class="suit">' + suit + '</span>' +
                '</div>';

            this.$element.find(selector).append(cardHTML);
        },

        displayDeck: function() {
            // for all cards in our deck
            // make an HTML element
            // put element in the cards element
            this.$element.find('.deck').empty();
            this.deck.forEach(function(card) {
              this.displayCard(card, '.deck');
            }.bind(this));
        },

        displayHand: function() {
            this.$element.find('.hand').empty();
            this.hand.forEach(function(card) {
              this.displayCard(card, '.hand');
            }.bind(this));
        }

    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );