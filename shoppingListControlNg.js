angular.module('shoppingList').
controller('ListControl', function($scope, $http, $timeout, listSwitcherService) {

     $scope.$on('switchToList', function(event, args) {
          $scope.retrieveList(args.index);
     });

     $scope.$on('removeAllFromCurrentList', function() {
         $scope.removeAll();
     });

     $scope.retrieveList = function(listID) {
         $scope.currentListID = listID;
         var postData = { 'listIndex': listID };
         $http.post('server/retrieveList.php', postData).success(function(data) {
             $scope.shoppingList = data;

             //store decoded data in $scope.shoppingList
             for (var i = $scope.shoppingList.length - 1; i >= 0; i--) {
                 $scope.shoppingList[i].text =
                     decodeURIComponent($scope.shoppingList[i].text);
                 $scope.shoppingList[i].beingEdited = false;
             }
         });

         /* just to verify list switching */
         /*if (listID===1) {
              $scope.shoppingList = [
                  { 'text': 'nuts', 'isGotten': true },
                  { 'text': 'bolts', 'isGotten': true },
                  { 'text': 'doodads', 'isGotten': false }
              ]
         }
         if (listID===2) {
             $scope.shoppingList = [
                 { 'text': 'bananas', 'isGotten': true },
                 { 'text': 'apples', 'isGotten': true },
                 { 'text': 'noosa yogurt', 'isGotten': false }
             ]
         }
         if (listID===3) {
             $scope.shoppingList = [
                 { 'text': 'beer', 'isGotten': true },
                 { 'text': 'wine', 'isGotten': true },
                 { 'text': 'cheese', 'isGotten': false }
             ]
         } */


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
		var postData = { 'itemName': newItem.text,
                         'listIndex': $scope.currentListID };
		$http.post('server/addToList.php', postData).success(function() {
            $timeout(function() { $scope.retrieveList($scope.currentListID) }, 1000);
        });


	};
	
	$scope.removeItem = function(index, itemName) {
		var removeData = {
			'itemIndex': index,
            'itemName': itemName,  //for fuzzy data integrity checking
            'listIndex': $scope.currentListID
        };

		//remove item on the client
		$scope.shoppingList.splice(index, 1);

		//remove item from the server
		$http.post('server/removeItem.php', removeData).success(function() {
            $timeout(function() { $scope.retrieveList($scope.currentListID) }, 1000);
        });
	};

    $scope.removeAll = function() {
        //iOS7 has suppressed alert popups on homescreen apps, so we can't do this anymore
        //var confirmDelete = confirm("Are you sure you want to clear the list?");
        //if (confirmDelete) {
            //remove script on the server, then refresh list (no UI update if not successful)
        var removeData = {
            'listIndex': $scope.currentListID
        };

        $http.post('server/removeAllGotten.php', removeData).success(function() {
                $timeout(function() { $scope.retrieveList($scope.currentListID) }, 1000);
            });
        //}
        //else {};
    };

    $scope.toggleGotten = function(index, itemName) {
        //toggle the value in the model
        $scope.shoppingList[index].isGotten = !$scope.shoppingList[index].isGotten;

        var gottenData = {
            'itemIndex': index,
            'itemName': itemName,  //for fuzzy data integrity checking
            'listIndex': $scope.currentListID
        };
        //item state is already updated, so save based on the *new* state
        if ($scope.shoppingList[index].isGotten === true) {
            $http.post('server/markItemGotten.php', gottenData).success(function() {
                $timeout(function() { $scope.retrieveList($scope.currentListID) }, 1000);
            });
        }
        else {
            $http.post('server/unMarkItemGotten.php', gottenData).success(function() {
                $timeout(function() { $scope.retrieveList($scope.currentListID) }, 1000);
            });
        }
    };

    $scope.saveNameEdit = function(index, newName, originalName) {
        $scope.shoppingList[index].text = newName;

        var editData = {
            'itemIndex': index,
            'itemNewName': newName,
            'itemOriginalName': originalName,   //for fuzzy data integrity checking
            'listIndex': $scope.currentListID
        };
        $http.post('server/editItemName.php', editData).success(function () {
            $timeout(function() { $scope.retrieveList($scope.currentListID) }, 1000);
        });
    };
});

