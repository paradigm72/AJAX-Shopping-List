angular.module('shoppingList').
controller('ListPicker', function($scope, $http, $timeout) {
    $scope.$on('openListPicker', function() {
        $scope.pickerVisible = true;

    });

    $scope.popoverLeftStyle = function() {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var left = w - 180;
        left = left + "px";
        return { "left": left};
    };

    $scope.initializeList = function() {
        $scope.listOfLists = [
            {name: 'Target'},
            {name: 'Menards'},
            {name: 'Copps'},
            {name: 'Steves'}
        ];
    };

    //methods:
    //get next list
    //get previous list
    //get all lists as object
    //add list
    //remove list
});
