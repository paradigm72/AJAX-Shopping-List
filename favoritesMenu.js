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

window.onload = function () {
	initalizeFavoritesMenuHandlers();
}


var initalizeFavoritesMenuHandlers = function () {
	var textBox = document.getElementById('newItem');
	var inlineFavorites = document.getElementById('inlineFavorites');
	var inputRow = document.getElementById('inputRow');
	
	/*When key presses are detected, refresh the text contents of the list*/
	var updateDisplayList = function () {
		return function () {
			inlineFavorites.innerHTML = "";
			var searchText = textBox.value;
			if (searchText.length = 0) { return false; }
			var re = new RegExp(searchText + ".");
			for (i=0; i < FavoritesArray.length; i += 1) {
				var thisFavorite = FavoritesArray[i].childNodes[0].nodeValue;
				if (thisFavorite.match(re)) {
					inlineFavorites.innerHTML = FavoritesArray[i].childNodes[0].nodeValue;
				}
			}
		};
	};	
	textBox.onkeydown = updateDisplayList();
	textBox.onkeypress = updateDisplayList();
	textBox.onkeyup = updateDisplayList();
	
	
	/*When the cursor/focus leaves the text box, hide the list*/
	var hideList = function () {
		return function () {
			inlineFavorites.innerHTML = ""; 
		};		
	};	
	inputRow.onblur = hideList();
	
	
	/*When the user clicks on an entry in the favorites div, add that to the list*/
	var favoriteEntryClick = function () {
		return function () {
			var itemToAdd = inlineFavorites.innerHTML;
			hideList()(); 
			addItemToList(itemToAdd);			
		};
	};
	inlineFavorites.onclick = favoriteEntryClick();
};

var FavoritesArray = [];

/*Note: this is called by retrieveListHTTPResponse*/
var loadFavoritesList = function () {
	var thePage = 'server/retrieveFavorites.php';
	myRand = parseInt(Math.random()*999999999);
	var theURL = thePage + "?rand=" + myRand;
	myReq.open("GET", theURL, true);
	myReq.onreadystatechange = retrieveFavoritesHTTPResponse;
	myReq.send(null);		
}

var retrieveFavoritesHTTPResponse = function () {
	if (myReq.readyState == 4) {
		if (myReq.status == 200) {
			var itemNamesList=myReq.responseXML.getElementsByTagName("itemName");
			
			for (i=0; i<itemNamesList.length; i++)
			{
				FavoritesArray.push(itemNamesList[i]);
			}
		}
	}		
}