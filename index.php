<!-----------------------
--- Paul Romine
--- (c) 2011
---	NAME: 		index.php
---	PURPOSE: 	landing page for the shopping list app
---
--- *pmr 10/2/11 - change sizing of 'add' button now that the .png is sized correctly
    *pmr 2/25/12 - updated img sizing to be done in css, so we can override for iPhone
                 - bump Favorites functionality due to non-functioning on iPhone or anywhere
--------------------------->


<link rel="stylesheet" type="text/css" href="style.css" />

<!--iPhone-specific stuff:-->
<link rel="stylesheet" media="only screen and (max-device-width: 480px)" href="highResStyle.css" type="text/css" />
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">



<!--Allow adding to the iOS home screen-->
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="apple-touch-icon" href="thumbnail.png"/>

<!--Hide the top status bar if possible-->
<meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" />


<script src="ajaxHelpers.js" type="text/javascript"></script>
<script src="modifyList.js" type="text/javascript"></script>
<script src="nameEdit.js" type="text/javascript"></script>
<script src="favoritesMenu.js" type="text/javascript"></script>

<!-- Bootstrap/Angular-->
<script src="js/bootstrap.min.js"></script>
<link rel="stylesheet" href="css/bootstrap.min.css" media="screen">
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.5/angular.min.js"></script>
<script src="shoppingListNg.js"></script>


<title>Shopping List</title>
<html>

<!--AJAX setup-->
<script type="text/javascript">
var myReq = getXMLHTTPRequest();
retrieveShoppingList();
</script>

<body ng-app>
<div id="header" onclick="retrieveShoppingList();">Shopping List</div>


<div ng-controller="ShoppingListCtrl">
<table class="items">
	<tr ng-repeat="item in shoppingList">
		<td class="item-{{item.isGotten}}">{{item.text}}</td>
		<td class="gottenButton-{{item.isGotten}}">
			<img src='images/toggleGotten-{{item.isGotten}}.png' class='button'>
		</td>
		<td class="delete">
			<img src='images/remove.png' class='button'>
		</td>
	</td>
</ul>


<table id="itemsTable" class="items">
<!--Populated by AJAX fn "retrieveShoppingList()"-->
</table>

<!--Secondary table for favorites menu and "add item" entry box"-->
<table class="items">

<!--New item text box-->
<form action="null.php" onsubmit="addItemFromNewTextBox(); return false;">
<tr id='inputRow'>
	<td class='newItemMarkerIcon'>
		<img src='images\edit.png' class='button'>
	</td>
	<td class='newText'>
		<input type="text" name="new" id="newItem"/>
	</td>
	<td class='addText' id='newItemCell'>
		<img src='images\add.png' class='button' onclick="javascript:addItemFromNewTextBox();">
	</td>
</tr>
</form>
</table>



</body>
</html>