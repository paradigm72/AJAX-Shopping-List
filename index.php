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
<script src="angular.js"></script>
<script src="shoppingListNg.js"></script>


<title>Shopping List</title>
<html>


<body ng-app>
<div id="header" onclick="retrieveShoppingList();">Shopping List</div>


<div ng-controller="ShoppingListCtrl" data-ng-init="retrieveList()">
<table class="items">
	<tr ng-repeat="item in shoppingList">
		<td class="item-{{item.isGotten}}" ng-click="startModifyingName($index)">
			<div ng-hide="item.beingEdited">{{item.text}}</div>
            <form ng-submit="stopModifyingName($index)">
                <input type="text" ng-model="item.text" placeholder="{{item.text}}"
                   ng-show="item.beingEdited">
            </form>
		</td>
		<td class="markGotten" ng-click="toggleGotten($index)">
            <img ng-show='item.isGotten' src='images/undo.png' class='button'>
            <img ng-show='!item.isGotten' src='images/gotten.png' class='button'>

            <input type="checkbox" ng-model="item.isGotten"
                   ng-checked="item.isGotten"
                   ng-show="false">
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
			<input type="text" ng-model="newItemText"
                   placeholder="Add new item..." id='newItem'>
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