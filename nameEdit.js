/*-----------------------
--- Paul Romine
--- (c) 2011
---	NAME: 		nameEdit.js
---	PURPOSE: 	Javascript for swapping out an item name with a text box and back
---
--- LAST REVISED: 10/2/11
---
--- *pmr 10/02/11 - convert to .onKeydown attribute set for saner '-escaping
--- *pmr 12/18/11 - move filing functions here, refactor into event handlers vs. manipulation
---------------------------*/

/*-----------------------------------------------------------
--- saveItemNameEdit                                     ----
--- Save new name to server in background (no callback)  ----
-----------------------------------------------------------*/
function saveItemNameEdit(itemIndex,newName) {
	//no loading icon for this - client already updates immediately
	
	//construct the PHP URL
	var thePage = 'server/editItemName.php';
	myRand = parseInt(Math.random()*99999999);
	var theURL = thePage + "?rand=" + myRand;
	
	//construct the POST param from item index and new name
	var param = "itemIndex="+itemIndex+ "&" + "itemNewName="+newName;
	
	//send off the AJAX request
	myReq.open("POST", theURL, true);
	myReq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	myReq.onreadystatechange = saveItemNameEditHTTPResponse();
	myReq.send(param);
}

/*-----------------------------------------------
--- saveItemNameEditHTTPResponse              ---
--- Not used - text updated on client already ---
-----------------------------------------------*/
function saveItemNameEditHTTPResponse() { }


/*---------------------------------------------------------------------
--- enableTextBox                                                   ---
--- Show the text box to edit the name                              ---
--- Called by onClick of the name cell, and keypress inside itself  ---
---------------------------------------------------------------------*/
function enableTextBox(itemNum,oldName)  {	
	//replace the cell's contents with a text box for editing the name
	document.getElementById('nameCell_'+itemNum).innerHTML = 
			"<input id='itemNameEdit_"+itemNum+"'"+
			     " class='nameEdit'>";
	//set up the disablement event on Enter (Accept)/click out (Cancel)
	document.getElementById('nameCell_'+itemNum).setAttribute('onKeydown',
				 'onKeyDown=nameEditTextBoxKeyDown(event,'+itemNum+',\''+oldName+'\')',
				 'onBlur=disableTextBox('+itemNum+',\''+oldName+'\')');
				 
	//pre-populate the text box with the old item name
	document.getElementById('itemNameEdit_'+itemNum).value = decodeURIComponent(oldName);
	
	//put focus into this text box so we can edit immediately
	document.getElementById('itemNameEdit_'+itemNum).focus();
}


/*---------------------------------------------------------------------
--- nameEditTextBoxKeyDown                                          ---
--- Pick up key press in the name edit text box (Esc, Enter, char)  ---
--- Called by onClick of the name cell, and keypress inside itself  ---
---------------------------------------------------------------------*/
function nameEditTextBoxKeyDown(event,itemNum,oldName) {
	//if escape was pressed, switch back without saving 
	if (event.keyCode == 27) {
		disableTextBox(itemNum,oldName);
		return false;
	}
		
	//check whether the pressed key actually was Enter
	if (event.keyCode != 13) return false;
	
	//retrieve the new item text from the input box's value
	var newItemName = document.getElementById('itemNameEdit_'+itemNum).value;
	
	//revert to the read-only cell (with the new text - client-side early update)
	disableTextBox(itemNum,newItemName);
	
	//go update the actual value in the list file
	newItemName = encodeURIComponent(newItemName);
	saveItemNameEdit(itemNum,newItemName);
}

/*-----------------------------------------------------------------------------
--- disableTextBox                                                          ---
--- Switch from the editable text box back to the read-only cell            ---
--- Called by onBlur of the text box, or certain conditions after keypress  ---
-----------------------------------------------------------------------------*/	
function disableTextBox(itemNum,newCellText) {
		//replace the cell's contents with the old read-only span, with the original text
		document.getElementById('nameCell_'+itemNum).innerHTML =
			"<span id='itemText_"+itemNum+"'>" + newCellText + "</span>";
		document.getElementById('itemText_'+itemNum).setAttribute('onClick',
				'enableTextBox('+itemNum+',\''+newCellText+'\')');
    return false;
}
