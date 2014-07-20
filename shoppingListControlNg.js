angular.module('shoppingList').
controller('ListControl', function($scope, $http, $timeout) {
	 $scope.showListPicker = function() {
         $scope.$broadcast('openListPicker');
     }


     $scope.retrieveList = function() {
		$http.get('server/retrieveList.php').success(function(data) {
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
            beingEdited: false,
            colorOverride: 'gray'
		};
		
		//add new item on the client
		$scope.shoppingList.push(newItem);
		$scope.newItemText = '';
        $scope.setFocusNow = true;

		
		//send new item to the server
		var postData = { 'itemName': newItem.text };
		$http.post('server/addToList.php', postData).success(function() {
            $timeout(function() { $scope.retrieveList() }, 1000);
        });


	};
	
	$scope.removeItem = function(index, itemName) {
		var removeData = {
			'itemIndex': index,
            'itemName': itemName  //for fuzzy data integrity checking
		};

		//remove item on the client
		$scope.shoppingList.splice(index, 1);

		//remove item from the server
		$http.post('server/removeItem.php', removeData).success(function() {
            $timeout(function() { $scope.retrieveList() }, 1000);
        });
	};

    $scope.removeAll = function() {
        //iOS7 has suppressed alert popups on homescreen apps, so we can't do this anymore
        //var confirmDelete = confirm("Are you sure you want to clear the list?");
        //if (confirmDelete) {
            //remove script on the server, then refresh list (no UI update if not successful)
            $http.post('server/removeAllGotten.php', {}).success(function() {
                $timeout(function() { $scope.retrieveList() }, 1000);
            });
        //}
        //else {};
    };

    $scope.toggleGotten = function(index, itemName) {
        //toggle the value in the model
        $scope.shoppingList[index].isGotten = !$scope.shoppingList[index].isGotten;

        var gottenData = {
            'itemIndex': index,
            'itemName': itemName  //for fuzzy data integrity checking
        };
        //item state is already updated, so save based on the *new* state
        if ($scope.shoppingList[index].isGotten === true) {
            $http.post('server/markItemGotten.php', gottenData).success(function() {
                $timeout(function() { $scope.retrieveList() }, 1000);
            });
        }
        else {
            $http.post('server/unMarkItemGotten.php', gottenData).success(function() {
                $timeout(function() { $scope.retrieveList() }, 1000);
            });
        }
    };

    $scope.saveNameEdit = function(index, newName, originalName) {
        $scope.shoppingList[index].text = newName;

        var editData = {
            'itemIndex': index,
            'itemNewName': newName,
            'itemOriginalName': originalName   //for fuzzy data integrity checking

        };
        $http.post('server/editItemName.php', editData).success(function () {
            $timeout(function() { $scope.retrieveList() }, 1000);
        });
    };
});

angular.module('shoppingList').
directive('ngSlBlur', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.safeApply = function(fn) {
                var phase = this.$root.$$phase;
                if(phase == '$apply' || phase == '$digest') {
                    if(fn && (typeof(fn) === 'function')) {
                        fn(); }
                } else {
                    this.$apply(fn); }
            };

            element.bind('blur', function() {
                //when adding new items, we create rows here during $digest
                //which makes $apply throw exceptions, so use "safeApply"
                scope.safeApply(attrs.ngSlBlur);
            });
        }
    }
}).
directive('itemname', function($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            originalName: '=',
            isGotten: '=',
            itemIndex: '=',
            colorOverride: '=',
            parentSaveNameEdit: '&saveFunc'
        },
        template:
            '<div>' +
                '<div class="item-{{isGotten}} item-{{colorOverride}}"' +
                ' ng-click="startModifyingName()"' +
                ' ng-hide="beingEdited">{{originalName}}</div>' +
                '<form ng-submit="stopModifyingName($event)">' +
                '<input type="text" ng-model="itemText"' +
                ' placeholder="{{originalName}}"' +
                ' ng-show="beingEdited"' +
                ' ng-sl-blur="cancelModifyingName($event)" ' +
                ' ng-keydown="stopModifyingName($event)" />' +
                '</form>' +
                '</div>',
        link: function(scope, element) {
            scope.beingEdited = false;

            scope.startModifyingName = function startModifyingName() {
                scope.beingEdited = true;
                scope.itemText = scope.originalName;
                $timeout(function() {
                    element[0].lastChild.lastChild.focus();
                });
            };

            scope.stopModifyingName = function stopModifyingName($event) {
                //If Enter pressed, save the edit. Note on some browser setups,
                //Enter just accepts the PHP form anyway and calls through the submit code path.
                if ($event.keyCode == 13)   {
                    scope.beingEdited = false;
                    scope.parentSaveNameEdit({
                        index: scope.itemIndex,
                        newName: scope.itemText,
                        originalName: scope.originalName
                    });
                }
            };

            scope.cancelModifyingName = function cancelModifyingName($event) {
                scope.beingEdited = false;
                scope.itemText = "";
            };
        }
    }
})
.directive('ngSlFocusOnAdd', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            scope.$watch('setFocusNow', function(value) {
                if (value === true) {
                    //$timeout(function() {
                    element[0].focus();
                    scope.setFocusNow = false;
                    //});
                }
            });
        }
    }
});