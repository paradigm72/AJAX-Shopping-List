/*-----------------------
--- Paul Romine
--- (c) 2012
---	NAME: 		favoritesMenu.js
---	PURPOSE: 	Javascript for showing and hiding a menu of favorite entries
---
--- *pmr 10/2/11 - created
--- *pmr 2/25/12 - update images to use a 'button' class instead of hardcoding width
--- *pmr 7/15/12 - re-enable, and cut out the code that handled hiding/showing the list
---------------------------*/

function acceptFavorite() {
	//first set up the loading icon
	document.getElementById('newFavoriteCell').innerHTML = 
	"<img " + 
		"src='images/loadingIcon.gif' " +
		"style='padding-top: 12px; padding-left: 6px;' " + 
	    "width=28 height=28> " +
	"</img>";

	//copy the item out of the dropdown list
	var listObj = document.getElementById('favoritesList')
	var itemName = listObj.options[listObj.selectedIndex].text;
	
	//reselect the null option
	document.getElementById('favoritesList').options[0].selected = true;
	
	//run AJAX to store that item to the server
	addItemToList(itemName);
	
	//don't refresh the list - that's handled by the callback
}
