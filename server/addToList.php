<!-----------------------
--- Paul Romine
--- (c) 2011
---	NAME: 		addToList.php
---	PURPOSE: 	Server code to add a new item to the list - string passed in
---				through POST.
---
--- CREATED: 6/12/11
---
-  *pmr 10/16/11 add code to store the most-frequently-added items
-  *pmr 08/18/12 use a more sane delimiter
--------------------------->

<?php	
	////////////////////////////
	/// ADD ITEM TO THIS SHOPPING LIST 
	////////////////////////////
	//get the item name
	$itemName=$_POST['itemName'];

	//open file for appending (start after the last pre-existing line)
	$filePointer = @fopen("../lists/1.txt", "a");	
	if (!$filePointer) { exit; }
	
	//add the item as "new"	
	fwrite($filePointer,$itemName."||0\n");
	
	
	////////////////////////////
	//// NOW UPDATE THE FAVORITES FLAT FILE
	///////////////////////////	
	//open MFAI flat file
	$dbFilePointer = @fopen("../lists/favorites.txt","rw");
	if (!$dbFilePointer) { exit; }
 	
	//loop until end of file, or we find a match for this item name
	while (!feof($dbFilePointer) || $foundMatch) {
		
		//get the current line
		$rawLine = fgets($dbFilePointer, 999);
		$lineArray = explode('|', $rawLine);
		$rawItemName = $lineArray[0];
		
		//if this line was the item just added as text, stop looping...
		if ($itemName==$rawItemName) { 
			//$foundMatch = true;   //for now until the line-updating block is written, don't ever get here
		}
	}
	
	//if we found the item already, just update its count
	if ($foundMatch) {
		$prevCount = $lineArray[1];
		$newCount = $prevCount + 1;
		$finishedLine = $itemName."|".$newCount;
		//this is going to need a different loop structure to be able to actually modify an existing
		//line. can we maybe just delete the line and append a new copy at the end instead?
		
	}
	//otherwise, switch to append mode and just add the item with a count of '1'
	else {
		fclose($dbFilePointer);
		$dbFilePointer = @fopen("../lists/favorites.txt","a");
		fwrite($dbFilePointer,$itemName."|1\n");
	}
		
	
	
	
	
?>