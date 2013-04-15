function ShoppingListCtrl($scope, $http) {
	$scope.retrieveList = function() {
		$http.get('server/retrieveList.php').success(function(data) {
			$scope.shoppingList = data;
		});
	};
	
	$scope.addNewItem = function() {
		var newItem = {
			text: $scope.newItemText,
			isGotten: false
		};
		
		$scope.shoppingList.push(newItem);
		$scope.newItemText = '';
		
		//send new item to the server (not yet functional)
		$http.post('server/addToList.php', 'itemName=' + newItem.text).success(function() {})
	};
	
	$scope.removeItem = function(index) {
		$scope.shoppingList.splice(index, 1);
	}
}