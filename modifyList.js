/*-----------------------
--- Paul Romine
--- (c) 2012
---	NAME: 		modifyList.js
---	PURPOSE: 	Javascript hooks to call into server code for retrieving and
---				editing shopping list
---
--- *pmr 10/2/11 - fix typos in markup
--- *pmr 2/25/12 - img tags now use classes so we can select huge sizes for iPhone
--- *pmr 4/23/12 - add button to un-mark item as gotten
--- *pmr 7/15/12 - renamed - this now contains just list addition/deletion/modification
---------------------------*/

////////////////////////////////////
// GET THE CURRENT LIST CONTENTS ///
////////////////////////////////////
function retrieveShoppingList() {
	doAjaxRequest('server/retrieveList.php',null,retrieveListHTTPResponse);
}

//callback for list rendering
function retrieveListHTTPResponse() {
	if (myReq.readyState == 4) {
		if (myReq.status == 200) {
			var itemNamesList=myReq.responseXML.getElementsByTagName("itemName");
			var gottenFlagsList=myReq.responseXML.getElementsByTagName("gotten");
			document.getElementById('itemsTable').innerHTML='';
			for (i=0; i<itemNamesList.length; i++)
			{
				generateItemsTableRow(itemNamesList,i,gottenFlagsList);
			}
		}
	}
}

/////////////////////////////////
// INDIVIDUAL ROW IN THE LIST ///
/////////////////////////////////
function generateItemsTableRow(itemNamesList,index,gottenFlagsList)
{
	var trItemRow=document.getElementById('itemsTable').insertRow(-1);
	var tdNameCell=trItemRow.insertCell(0);  //name
	var tdGottenCell=trItemRow.insertCell(1);  //gotten button
	var tdRemoveCell=trItemRow.insertCell(2);  //remove button
	trItemRow.setAttribute('id','row_' + index);
	
	tdNameCell.setAttribute('id','nameCell_' + index);
	tdNameCell.innerHTML="<span id='itemText_" + index +"'>" + 
						 decodeURIComponent(itemNamesList[index].childNodes[0].nodeValue) + 
						 "</span>";
	document.getElementById('itemText_'+index).setAttribute('onClick',
				'enableTextBox('+index+',\''+ itemNamesList[index].childNodes[0].nodeValue + '\')');
	if (gottenFlagsList[index].childNodes[0].nodeValue == "1") {
		tdNameCell.setAttribute('class','gottenItem name');  //name with strikethrough
        tdGottenCell.innerHTML="<img src='images/undo.png' class='button'>";
		tdGottenCell.setAttribute('class','unMarkGotten');
        tdGottenCell.setAttribute('onclick','unMarkItemGotten(this.id)');
		tdGottenCell.setAttribute('id','gotten_' + index);
	}				
	else {
		tdNameCell.setAttribute('class','name');      //name w/o strikethrough
		//the 'gotten' button is only available for items that aren't gotten
		tdGottenCell.innerHTML="<img src='images/gotten.png' class='button'>";
		tdGottenCell.setAttribute('class','markGotten');
		tdGottenCell.setAttribute('onclick','markItemGotten(this.id)');
		tdGottenCell.setAttribute('id','gotten_' + index);
	}				
	
	tdRemoveCell.innerHTML="<img src='images/remove.png' class='button'>";
	tdRemoveCell.setAttribute('class','delete');
	tdRemoveCell.setAttribute('onclick','removeItemFromList(this.id)');
	tdRemoveCell.setAttribute('id','remove_' + index);
}

/////////////////////////////////////
// ADD A NEW ITEM TO THE LIST     ///
/////////////////////////////////////
function addItemFromNewTextBox() {

	//get the item name from the text box
	var itemName = encodeURIComponent(document.getElementById('newItem').value);
	
	//handle length zero
	if (itemName.length == 0) { 
        return false; 
    }
    
    //first set up the loading icon
	document.getElementById('newItemCell').innerHTML = 
	"<img " + 
		"src='images/loadingIcon.gif' " +
		"style='padding-top: 12px; padding-left: 6px;' " + 
	    "class='loadingSpinner'> " +
	"</img>";
	
	//call shared function to do all the AJAX
	addItemToList(itemName);
}


function addItemToList(itemName) {
	var paramDictionary = {
		itemName: itemName
	};
	doAjaxRequest('server/addToList.php',paramDictionary,addItemToListHTTPResponse);
}

function addItemToListHTTPResponse() {
	if (myReq.readyState == 4) {
		if (myReq.status == 200) {
			retrieveShoppingList();
			document.getElementById('newItem').value='';
			document.getElementById('newItemCell').innerHTML = 
			   "<img " +
			   "src='images/add.png' class='button' " +
			   "onclick='addItemFromNewTextBox();'></img>";
		}
	}
}



//////////////////////////////////////////
// MARK AN ITEM ON THE LIST AS GOTTEN  ///
//////////////////////////////////////////
function markItemGotten(id) {
	//first set up the loading icon
	document.getElementById(id).innerHTML = "<img src='images/loadingIcon.gif' class='loadingSpinner'></img>";

	//then grab the list element id #
	var index=id.split("_");
	var itemIndexParam = index[1];	
	var paramDictionary = {
		itemIndex: itemIndexParam
	};
		
	//then send the AJAX request
	doAjaxRequest('server/markItemGotten.php',paramDictionary,markItemGottenHTTPResponse);
}

function markItemGottenHTTPResponse() {
	if (myReq.readyState == 4) {
		if (myReq.status == 200) {
			retrieveShoppingList();
		}
	}
}


////////////////////////////////////////////
// UNMARK AN ITEM ON THE LIST AS GOTTEN  ///
////////////////////////////////////////////
function unMarkItemGotten(id) {
	//first set up the loading icon
	document.getElementById(id).innerHTML = "<img src='images/loadingIcon.gif' class='loadingSpinner'></img>";
	
	//then grab the list element id #
	var index=id.split("_");
	var itemIndexParam = index[1];	
	var paramDictionary = {
		itemIndex: itemIndexParam
	};
	
	//then send the AJAX request
	doAjaxRequest('server/unMarkItemGotten.php',paramDictionary,unMarkItemGottenHTTPResponse);
}

function unMarkItemGottenHTTPResponse() {
	if (myReq.readyState == 4) {
		if (myReq.status == 200) {
			retrieveShoppingList();
		}
	}
}


//////////////////////////////////////////
// REMOVE AN ITEM FROM THE LIST        ///
//////////////////////////////////////////
function removeItemFromList(id) {
	//first set up the loading icon
	document.getElementById(id).innerHTML = "<img src='images/loadingIcon.gif' class='loadingSpinner'></img>";

	//then send off the ajax request
	var index=id.split("_");
	var itemIndexParam = index[1];	
	var paramDictionary = {
		itemIndex: itemIndexParam,
	};
	doAjaxRequest('server/removeItem.php',paramDictionary,removeItemHTTPResponse);
}

function removeItemHTTPResponse() {
	if (myReq.readyState == 4) {
		if (myReq.status == 200) {
			retrieveShoppingList();
		}
	}	
}	
