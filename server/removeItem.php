<!-----------------------
--- Paul Romine
--- (c) 2011
---	NAME: 		removeItem.php
---	PURPOSE: 	Server code to remove an item from the list.
---
--- LAST REVISED: 6/12/11
--------------------------->


<?php
	$itemIndex=$_POST['itemIndex'];
	$tempFileContents='';
	
	$filePointer = @fopen("../lists/1.txt", "r");	//"r" is for read-only, starting at top
	if (!$filePointer) {
		exit;
	}	

	//quick loop through each line until we get to the known correct line # 
	//(throw the others away, but keep the entire contents for later reconstruction)
	//
	for ($currLine = 0; $currLine < $itemIndex; $currLine++)
	{
		$rawLine = fgets($filePointer, 999);
		$tempFileContents = $tempFileContents.$rawLine;
	}
	
	//now $rawLine contains the correct line
	$rawLine = fgets($filePointer, 999);
	//Skip over this line - that's how we remove it. Do nothing here.
	
	//now loop freely until the end of the file, appending those as well
	while (!feof($filePointer)) {
		$rawLine = fgets($filePointer, 999);
		$lineArray = explode('|', $rawLine);
		
		if (strlen($lineArray[0])>0) {
			$tempFileContents = $tempFileContents.$rawLine;
		}
	}
	
	//now overwrite the entire contents of the file with the string that's in memory
	fclose($filePointer);
	$filePointer = @fopen("../lists/1.txt", "w");	 //"w" so we start writing from the top
	fwrite($filePointer, $tempFileContents);	
?>