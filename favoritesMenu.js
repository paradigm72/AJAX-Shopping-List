/*-----------------------
--- Paul Romine
--- (c) 2012
---	NAME: 		favoritesMenu.js
---	PURPOSE: 	Javascript for showing and hiding a menu of favorite entries
---
--- *pmr 10/2/11 - created
--- *pmr 2/25/12 - update images to use a 'button' class instead of hardcoding width
--- *pmr 7/15/12 - re-enable, and cut out the code that handled hiding/showing the list
--- *pmr 8/18/12 - rewritten to be an inline popup instead of a separate UI element
---------------------------*/

//create the namespace if not already created
var com;
if (!com) {
	com = {};
}
if (!com.letxbe) {
	com.letxbe = {};
}


com.letxbe.FavoritesMenu = function () {
	var textBox;
	var inlineFavorites;
	var inputRow;
	var FavoritesArray;
	
	/*Initialize the event handlers*/
	function assignFavoritesEventHandlers() {
		textBox = document.getElementById('newItem');
		inlineFavorites = document.getElementById('inlineFavorites');
		inputRow = document.getElementById('inputRow');
	
	
		textBox.onkeydown = updateDisplayList;
		textBox.onkeypress = updateDisplayList;
		textBox.onkeyup = updateDisplayList;
		inlineFavorites.onclick = favoriteEntryClick;
	}	
	
	/*When key presses are detected, refresh the text contents of the list*/
	function updateDisplayList() {
		inlineFavorites.innerHTML = "";
		var searchText = textBox.value;
		if (searchText.length == 0) { return true; }
		var re = new RegExp(searchText + ".");
		for (i=0; i < FavoritesArray.length; i += 1) {
			var thisFavorite = FavoritesArray[i].childNodes[0].nodeValue;
			if (thisFavorite.match(re)) {
				inlineFavorites.innerHTML = FavoritesArray[i].childNodes[0].nodeValue;
			}
		}
	}
	
	/*When the user clicks on an entry in the favorites div, add that to the list*/
	function favoriteEntryClick() {
		var itemToAdd = inlineFavorites.innerHTML;
		hideList(); 
		addItemToList(itemToAdd);			
	}
	
	/*When the cursor/focus leaves the text box, hide the list*/
	function hideList() {
		inlineFavorites.innerHTML = ""; 
	}
	
	/*Load the favorite items from the server into an array*/
	function loadFavoritesList() {
		var thePage = 'server/retrieveFavorites.php';
		myRand = parseInt(Math.random()*999999999);
		var theURL = thePage + "?rand=" + myRand;
		myReq.open("GET", theURL, true);
		myReq.onreadystatechange = retrieveFavoritesHTTPResponse;
		myReq.send(null);
	}	
	
	/*Add a new item to the favorites list (called from AJAX responder) */
	function addItemToFavoritesList(itemToAdd) {
		if (!FavoritesArray) { FavoritesArray = []; }
		FavoritesArray.push(itemToAdd);
	}
	
	return {
		Initialize: function() { assignFavoritesEventHandlers(); },
		UpdateDisplayList: function() { updateDisplayList(); },
		FavoriteEntryClick: function() { favoriteEntryClick(); },
		HideList: function() { hideList(); },
		LoadFavoritesList: function() { loadFavoritesList(); },
		AddFavoriteToList: function(itemToAdd) { addItemToFavoritesList(itemToAdd); }
	}
}();


window.onload = function() {
	com.letxbe.FavoritesMenu.Initialize();	
}



var retrieveFavoritesHTTPResponse = function () {
	if (myReq.readyState == 4) {
		if (myReq.status == 200) {
			var itemNamesList=myReq.responseXML.getElementsByTagName("itemName");
			
			for (i=0; i<itemNamesList.length; i++)
			{
				com.letxbe.FavoritesMenu.AddFavoriteToList(itemNamesList[i]);
			}
		}
	}		
}