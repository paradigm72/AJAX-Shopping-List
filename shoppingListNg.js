function ShoppingListCtrl($scope, $http) {
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
            beingEdited: false
		};
		
		//add new item on the client
		$scope.shoppingList.push(newItem);
		$scope.newItemText = '';
		
		//send new item to the server
		var postData = { 'itemName': newItem.text };
		$http.post('server/addToList.php', postData).success(function() {
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
			});
	};

    $scope.saveGottenUpdate = function(index) {
        var gottenData = {
            'itemIndex': index
        };
        //item state is already updated, so save based on the *new* state
        if ($scope.shoppingList[index].isGotten === true) {
            $http.post('server/markItemGotten.php', gottenData).success(function() {});
        }
        else {
            $http.post('server/unMarkItemGotten.php', gottenData).success(function() {});
        }
    }

    $scope.startModifyingName = function(index) {
        $scope.shoppingList[index].beingEdited = true;
    };

    $scope.stopModifyingName = function(index) {
        $scope.shoppingList[index].beingEdited = false;

        var editData = {
            'itemIndex': index,
            'itemNewName': $scope.shoppingList[index].text
        };
        $http.post('server/editItemName.php', editData).success(function () {
            });
    };
}