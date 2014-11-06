angular.module('shoppingList').
controller('ListPicker', function($scope, $http, $timeout, listSwitcherService) {
    $scope.showListPicker = function() {
        $scope.pickerVisible = true;
    };

    $scope.popoverLeftStyle = function() {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var left = w - 180;
        left = left + "px";
        return { "left": left};
    };

    $scope.switchToList = function(index) {
        listSwitcherService.switchToList(index);
        $scope.pickerVisible = false;
        $scope.currentSelectedName = $scope.listOfLists[index].name;
    };

    $scope.removeAll = function() {
        listSwitcherService.removeAllFromCurrentList();
    };

    $scope.initializeList = function() {
        $scope.listOfLists = [
            {name: 'Target'},
            {name: 'Menards'},
            {name: 'Copps'},
            {name: 'Steves'}
        ];
        $scope.currentSelectedName = $scope.listOfLists[0].name;
    };

    //methods:
    //get next list
    //get previous list
    //get all lists as object
    //add list
    //remove list
});
