var shoppingListModule = angular.module('shoppingList', []);

shoppingListModule.controller('ListControl', function($scope, $http) {
	$scope.retrieveList = function() {
		$http.get('server/retrieveList.php').success(function(data) {
			$scope.shoppingList = [];

            $scope.shoppingList = data;

			//store decoded data in $scope.shoppingList
			for (var i = $scope.shoppingList.length - 1; i >= 0; i--) {
				$scope.shoppingList[i].text = 
					decodeURIComponent($scope.shoppingList[i].text);
                $scope.shoppingList[i].beingEdited = false;
			}
		});
    };
	
	$scope.addNewItem = function() {
		var newItem = {
			text: $scope.newItemText,
			isGotten: false,
            beingEdited: false
		};
		
		//add new item on the client
		$scope.shoppingList.push(newItem);
		$scope.newItemText = '';
		
		//send new item to the server
		var postData = { 'itemName': newItem.text };
		$http.post('server/addToList.php', postData).success(function() {
		    //$scope.retrieveList();
        });
	};
	
	$scope.removeItem = function(index) {
		var removeData = {
			'itemIndex': index
		};

		//remove item on the client
		$scope.shoppingList.splice(index, 1);

		//remove item from the server
		$http.post('server/removeItem.php', removeData).success(function() {
            //$scope.retrieveList();
        });
	};

    $scope.toggleGotten = function(index) {
        //toggle the value in the model
        $scope.shoppingList[index].isGotten = !$scope.shoppingList[index].isGotten;

        var gottenData = {
            'itemIndex': index
        };
        //item state is already updated, so save based on the *new* state
        if ($scope.shoppingList[index].isGotten === true) {
            $http.post('server/markItemGotten.php', gottenData).success(function() {
                //$scope.retrieveList();
            });
        }
        else {
            $http.post('server/unMarkItemGotten.php', gottenData).success(function() {
                //$scope.retrieveList();
            });
        }
    };

    $scope.saveNameEdit = function(index, newName) {
        $scope.shoppingList[index].text = newName;

        var editData = {
            'itemIndex': index,
            'itemNewName': newName
        };
        $http.post('server/editItemName.php', editData).success(function () {
        });
    };
});


shoppingListModule.directive('ngSlBlur', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('blur', function() {
                scope.$apply(attrs.ngSlBlur);
            });
        }
    }
});

shoppingListModule.directive('itemname', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            originalName: '=',
            isGotten: '=',
            itemIndex: '=',
            parentSaveNameEdit: '&saveFunc'
        },
        template:
            '<div>' +
                '<div class="item-{{isGotten}}" ng-click="startModifyingName()"' +
                ' ng-hide="beingEdited">{{originalName}}</div>' +
                '<form ng-submit="stopModifyingName()">' +
                    '<input type="text" ng-model="itemText"' +
                    ' placeholder="{{originalName}}"' +
                    ' ng-show="beingEdited"' +
                    ' ng-sl-blur="cancelModifyingName()" ' +
                    ' ng-keydown="stopModifyingName()" autofocus />' +
                '</form>' +
            '</div>',
        link: function(scope, element, attrs, controller) {
            scope.beingEdited = false;

            scope.startModifyingName = function startModifyingName() {
                scope.beingEdited = true;
                //below not working, not sure why...
                element[0].lastElementChild.lastElementChild.focus();
            };

            scope.stopModifyingName = function stopModifyingName() {
                scope.beingEdited = false;
                scope.parentSaveNameEdit({ index: scope.itemIndex, newName: scope.itemText});
            };

            scope.cancelModifyingName = function cancelModifyingName() {
                scope.beingEdited = false;
            };
        }
    }
});