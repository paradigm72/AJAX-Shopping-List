angular.module('shoppingList').
controller('ListPicker', function($scope, $http, $timeout) {
    $scope.$on('openListPicker', function() {
        $scope.pickerVisible = true;
    });

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
