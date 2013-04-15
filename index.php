<!--
- Paul Romine
- (c) 2011
-	NAME: 		index.php
-	PURPOSE: 	landing page for the shopping list app
-
- *pmr 10/2/11 - change sizing of 'add' button now that the .png is sized correctly
    *pmr 2/25/12 - updated img sizing to be done in css, so we can override for iPhone
                 - bump Favorites functionality due to non-functioning on iPhone or anywhere
-->


<link rel="stylesheet" type="text/css" href="style.css" />

<!-- iPhone-specific stuff: -->
<link rel="stylesheet" media="only screen and (max-device-width: 480px)" href="highResStyle.css" type="text/css" />
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">



<!--Allow adding to the iOS home screen-->
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="apple-touch-icon" href="thumbnail.png"/>

<!--Hide the top status bar if possible-->
<meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<!-- Angular-->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.5/angular.min.js"></script>
<script src="shoppingListNg.js"></script>


<title>Shopping List</title>
<html>


<body ng-app>
<div id="header" onclick="retrieveShoppingList();">Shopping List</div>


<div ng-controller="ShoppingListCtrl" data-ng-init="retrieveList()">
<table class="items">
	<tr ng-repeat="item in shoppingList">
		<td class="item-{{item.isGotten}}">
			{{item.text}}			
		</td>
		<td class="markGotten gottenButton-{{item.isGotten}}">
			<input type="checkbox" ng-model="item.isGotten" class="gottenCheckbox">
		</td>
		<td class='delete' ng-click="removeItem($index)">
			<img src='images/remove.png' class='button'>
		</td>
	</tr>
</table>

<table class='items'>
<form ng-submit='addNewItem()'>
	<tr id='inputRow'>
		<td class='newItemMarkerIcon'>
			<img src='images/edit.png' class='button'>
		</td>
		<td class='newText'>
			<input type="text" ng-model="newItemText" placeholder="Add new item..." id='newItem'>
		</td>
		<td class='addText' id='newItemCell'>
			<img src='images/add.png' class='button'>
		</td>
	</tr>
</form>
</table>
</div>

</body>
</html>