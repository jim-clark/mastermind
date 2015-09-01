angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal) {

  // These icon classes are for mapping the selected guesses to the UI
  $scope.icons = ['ion-social-apple', 'ion-social-android','ion-social-angular','ion-social-html5'];

  // The current selected icon to assign to any clicked position.
  $scope.selectedIcon = 0;

  // This will make it easier if we want to increase difficulty later with more positions and/or icons
  $scope.numPositions = 4;
  $scope.numIcons = 4;

  // The secret code
  var code;

  // The icon class to display when a pick has not been made for a position
  $scope.placeholderIcon = 'ion-more';

  // Initialize game state
  $scope.newGame = function() {
    // Init the secret code
    code = generateCode();

    // Init the array of turns
    $scope.turns = [];
    nextTurn();
  };

  // Run newGame() upon loading
  $scope.newGame();

  $scope.scoreTurn = function() {
    $scope.currentTurn.score();

    // Show winModal IF turn is correct, otherwise, next turn
    if ($scope.currentTurn.isWinner) {
      $scope.winModal.show();
    } else {
      nextTurn();
    }
  };

  $scope.disableScoreButton = function() {
    // Get picks for the current turn
    var picks = $scope.currentTurn.positions;
    var missingPicks = false;
    for (var i = 0; i < picks.length; i++) {
      if (picks[i] === null) {
        missingPicks = true;
        break;
      }
    }
    return missingPicks;
  };

  // Returns a bogus array for ng-repeat to loop through a number of times.
  // Used to provide an array with a size equal to $scope.numPostions
  $scope.range = function(size) {
    return new Array(size);
  };

  // Create the winner modal.
  $ionicModal.fromTemplateUrl('templates/winner.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.winModal = modal;
  });

  // TODO: Call this function from the 'Play Again!' button in winModal's html (winner.html)
  $scope.playAgain = function() {
    $scope.newGame();
    $scope.winModal.hide();
  };

  // Constructor for a Turn object
  function Turn() {
    this.positions = [];
    for (var i = 0; i < $scope.numPositions; i++) {
      this.positions.push(null); // null = no icon picked yet by user
    }
    this.perfect = 0;
    this.almost = 0;
  }

  // Add 'score' method to Turn objects
  Turn.prototype.score = function() {
    var self = this;
    // Make copies so we don't mess with actual positions
    var picks = self.positions.slice();
    var secret = code.slice();

    // Score the turn, first check for perfect picks
    self.perfect = 0;
    for (var i = 0; i < secret.length; i++) {
      if (picks[i] === secret[i]) {
        self.perfect++;
        picks[i] = null;
        secret[i] = null;
      }
    }

    // Next, check for almosts
    self.almost = 0;
    if (self.perfect < code.length) {
      self.isWinner = false;
      secret.forEach(function(sec) {
        if (sec !== null) {
          for (var i = 0; i < picks.length; i++) {
            if (sec === picks[i]) {
              picks[i] = null;
              self.almost++;
              break;
            }
          }
        }
      });
    } else {
      self.isWinner = true;
    }
  }; // end Turn.prototype.score

  // Helper functions

  function nextTurn() {
    $scope.turns.push(new Turn());
    $scope.currentTurn = $scope.turns[$scope.turns.length - 1];
  }

  function generateCode() {
    var a = [];
    for (var i = 0; i < $scope.numPositions; i++) {
      a.push(Math.floor(Math.random() * $scope.numIcons));
    }
    return a;
  }

});
