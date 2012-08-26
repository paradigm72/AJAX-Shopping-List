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
	var textBox = document.getElementById('newItem')
	var inlineFavorites = document.getElementById('inlineFavorites')
	
	/*When key presses are detected, refresh the text contents of the list*/
	var updateDisplayList = function () {
		return function () {
			var searchText = textBox.value;
			inlineFavorites.innerHTML = searchText;
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
	inlineFavorites.onblur = hideList();
	
	
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
