var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {

    // Initialize team objects with names and subtotals
    $scope.team1 = { name: 'Team 1', subtotal: 0 };
    $scope.team2 = { name: 'Team 2', subtotal: 0 };

    // Define max points to win and a flag for game over
    $scope.maxPoints = 100;
    $scope.gameOver = false;
    $scope.winningMessage = ""; // Message to display the winner

    // Initialize games array to track each game round
    $scope.games = [];

    // Selected team and points for the update action
    $scope.selectedTeam = '';
    $scope.points = 0;

    // Function to apply points to the selected team for the current game
    $scope.updateScore = function() {
        if ($scope.gameOver || !$scope.selectedTeam || $scope.points <= 0) return;

        // Add the current game with points for the selected team and 0 for the other team
        let game = { team1Score: 0, team2Score: 0 };
        if ($scope.selectedTeam === 'team1') {
            game.team1Score = $scope.points;
        } else if ($scope.selectedTeam === 'team2') {
            game.team2Score = $scope.points;
        }
        $scope.games.push(game);

        // Update subtotals
        $scope.team1.subtotal = $scope.games.reduce((acc, game) => acc + game.team1Score, 0);
        $scope.team2.subtotal = $scope.games.reduce((acc, game) => acc + game.team2Score, 0);

        // Check if max points have been reached
        if ($scope.team1.subtotal >= $scope.maxPoints || $scope.team2.subtotal >= $scope.maxPoints) {
            const winningTeam = $scope.team1.subtotal >= $scope.maxPoints ? $scope.team1 : $scope.team2;
            $scope.winningMessage = `${winningTeam.name} gana con ${winningTeam.subtotal} puntos! Bajandaaa`;
            $scope.gameOver = true;
        }

        // Clear the entered points and selected team after updating
        $scope.points = 0;
        $scope.selectedTeam = '';
    };

    // Reset the game
    $scope.newGame = function() {
        $scope.team1.subtotal = 0;
        $scope.team2.subtotal = 0;
        $scope.games = [];
        $scope.gameOver = false;
        $scope.winningMessage = ""; // Reset the winning message
    };
});
