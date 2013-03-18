function ShoppingListCtrl($scope) {
	$scope.shoppingList = [
		{text: 'Protein bars', isGotten: false},
		{text: 'Milk', isGotten: false},
		{text: 'Bananas', isGotten: true}
	];
	
	$scope.addNewItem = function() {
		$scope.shoppingList.push({
			text: $scope.newItemText,
			isGotten: false
		});
		$scope.newItemText = '';
	};
	
	$scope.removeItem = function(index) {
		$scope.shoppingList.splice(index, 1);
	}
}