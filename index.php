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

<script src="ajaxHelpers.js" type="text/javascript"></script>
<script src="modifyList.js" type="text/javascript"></script>
<script src="nameEdit.js" type="text/javascript"></script>
<script src="favoritesMenu.js" type="text/javascript"></script>

<!--Allow adding to the iOS home screen-->
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="apple-touch-icon" href="thumbnail.png"/>

<!--Hide the top status bar if possible-->
<meta names="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<title>Shopping List</title>
<html>

<!--AJAX setup-->
<script type="text/javascript">
var myReq = getXMLHTTPRequest();
retrieveShoppingList();
</script>

<body>
<div id="header" onclick="retrieveShoppingList();">Shopping List</div>


<table id="itemsTable" class="items">
<!--Populated by AJAX fn "retrieveShoppingList()"-->
</table>

<!--Secondary table for favorites menu and "add item" entry box"-->
<table class="items">

<!--New item from favorites dropdown-->
<!--*pmr 8/12/12 - removing again due to usability problems
<tr id='favoritesRow'>
	<td class='favoritesMarkerIcon'>
		<img class='button' src='images\favorites.png'>
	</td>
	<td class='favoritesDropDown'>
		<form action='null.php' onsubmit="acceptFavorite(); return false;">
			<select name='favorites' id='favoritesList' onblur="acceptFavorite();">
				<option value=''></option>
				<option value='v8 fusion'>V8 Fusion</option>
				<option value='protein bars'>Protein Bars</option>
				<option value='turkey jerky'>Turkey Jerky</option>
				<option value='eggs'>Eggs</option>
				<option value='bacon'>Bacon</option>
			</select>
		</form>
	</td>	
	<td class='addFavorite' id='newFavoriteCell'>
		<img src='images\add.png' class='button' onclick='acceptFavorite();'>
	</td>
</tr>
-->

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