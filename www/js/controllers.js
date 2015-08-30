angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal) {

  // These icon classes are for mapping the selected guesses to the UI
  $scope.icons = ['ion-social-apple', 'ion-social-android','ion-social-angular','ion-social-html5'];

  // The current selected icon to assign to any clicked position.
  // TODO: Needs to be set when buttons in menu.html are clicked.
  $scope.selectedIcon = 0;

  // This will make it easier if we want to increase difficulty later with more positions and/or icons
  $scope.numPositions = 4;
  $scope.numIcons = 4;

  // Holds the secret code
  var code;

  // The icon class to display when a pick has not been made for a position
  $scope.placeholderIcon = 'ion-more';

  // Initialize game state
  $scope.newGame = function() {
    // Init the secret code
    code = generateCode();

    // Init the array of turns
    $scope.turns = [];
    $scope.turns.push(new Turn());


    // TODO: Set all data properties/structures to their beginning state

  };

  // Run newGame() upon loading
  $scope.newGame();

  /* 
  TODO: Call this function when the user clicks a 'score' button.
        The 'score' button should remain disabled until all positions have a value.
        Maybe a button with an icon of a checkmark would be a good UI choice? Or,
        just use a small button with text of 'Score'?
  */
  $scope.scoreTurn = function() {
    // TODO: Score the turn

    // TODO: Show winModal IF turn is correct. Put below line in an if statement.
    // $scope.winModal.show();
  };

  // Returns the class name for the picked icon given a position.
  // Will return 
  $scope.getPickedIcon = function(pos) {

  }


  // Returns a bogus array for ng-repeat to loop through a number of times.
  // Used to provide an array with a size equal to $scope.numPostions
  $scope.range = function(size) {
    return new Array(size);
  }

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

  };


  // Helper functions

  function generateCode() {
    var a = [];
    for (var i = 0; i < $scope.numPositions; i++) {
      a.push(Math.floor(Math.random() * $scope.numIcons));
    }
    return a;
  }

});

