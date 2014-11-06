angular.module('shoppingList', []);

angular.module('shoppingList').factory('listSwitcherService', function($rootScope) {
    var _listSwitcherService = {};

    _listSwitcherService.switchToList = function(index) {
        $rootScope.$broadcast('switchToList',  { 'index': index });
    }

    _listSwitcherService.removeAllFromCurrentList = function() {
        $rootScope.$broadcast('removeAllFromCurrentList');
    }

    return _listSwitcherService;
});