function ShoppingListCtrl($scope, $http) {
	$scope.retrieveList = function() {
		$http.get('server/retrieveList.php').success(function(data) {
			$scope.shoppingList = data;

			//store decoded data in $scope.shoppingList
			for (var i = $scope.shoppingList.length - 1; i >= 0; i--) {
				$scope.shoppingList[i].text = 
					decodeURIComponent($scope.shoppingList[i].text);
			};
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
		var postData = { 'itemName': newItem.text };
		$http.post('server/addToList.php', postData).success(function() {
				//alert("Successfully called the post!");
		    });
	};
	
	$scope.removeItem = function(index) {
		$scope.shoppingList.splice(index, 1);
	}
}