angular.module('shoppingList', []);

angular.module('shoppingList').factory('listSwitcherService', function($rootScope) {
    var _listSwitcherService = {};

    _listSwitcherService.message = '';

    _listSwitcherService.switchToList = function(index) {
        data = { 'index': index };
        $rootScope.$broadcast('switchToList', data);
    }

    return _listSwitcherService;
});