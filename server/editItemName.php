<!-----------------------
--- Paul Romine
--- (c) 2011
---	NAME: 		editItemName.php
---	PURPOSE: 	Server code to change the name of an existing item in the list
---				New name and index passed in through POST.
---
- LAST REVISED: 7/30/11
--------------------------->

<?php	
	//$param = $_POST['param'];
	//$paramArray = explode('|',$param);
	//$itemNewName = $paramArray[0];
	//$itemIndex = $paramArray[1];
	$itemIndex = $_POST['itemIndex'];
	$itemNewName = $_POST['itemNewName'];
	
	$filePointer = @fopen("../lists/1.txt", "r");	
	if (!$filePointer) {
		exit;
	}
	
	//quick loop through each line until we get to the known correct line # 
	//(throw the others away, but add together entire contents for later reconstruction)
	for ($currLine = 0; $currLine < $itemIndex; $currLine++)
	{
		$rawLine = fgets($filePointer, 999);
		$tempFileContents = $tempFileContents.$rawLine;
	}
	
	//now $rawLine contains the correct line
	$rawLine = fgets($filePointer, 999);
	
	//fetch whether this item is 'gotten' or not
	$lineArray = explode('|', $rawLine);
	$itemGotten = $lineArray[2];
	
	//create the new version of this line: name,,gotten
	//note: since $itemGotten was the last piece of the line, it has a \n at the end already
	$finishedLine = $itemNewName."||".$itemGotten;  
	
	//append it to the lines we looped over
	$tempFileContents = $tempFileContents.$finishedLine;
	
	//now loop freely until the end of the file, appending those as well
	while (!feof($filePointer)) {
		$rawLine = fgets($filePointer, 999);
		$tempFileContents = $tempFileContents.$rawLine;
	}
	
	//now overwrite the entire contents of the file with the string that's in memory
	fclose($filePointer);
	$filePointer = @fopen("../lists/1.txt", "w");
	fwrite($filePointer, $tempFileContents);	
?>
?>