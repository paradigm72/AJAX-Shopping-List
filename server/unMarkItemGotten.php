<?php
    $POSTDATA = file_get_contents("php://input");
    $POSTDATA = json_decode($POSTDATA, true);
    $itemIndex = $POSTDATA['itemIndex'];
    $itemNamePOST = $POSTDATA['itemName'];
	
	$filePointer = @fopen("../lists/1.txt", "r+");	
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
	$lineArray = explode('|', $rawLine);
	$itemName = $lineArray[0];

    //fuzzy data integrity checking - if the name doesn't match, bail
    $itemNamePOST=strip_tags($itemNamePOST);
    $itemNamePOST=rawurlencode($itemNamePOST);
    if (strcmp($itemNamePOST, $itemName) != 0) {
        exit;
    }

	//create the new version of this line: name,,false  <--- false means 'not yet gotten'
	$finishedLine = $itemName."||false\n";
	//append it to the lines we looped over
	$tempFileContents = $tempFileContents.$finishedLine;
	
	//now loop freely until the end of the file, appending those as well
	while (!feof($filePointer)) {
		$rawLine = fgets($filePointer, 999);
		$tempFileContents = $tempFileContents.$rawLine;
	}
	
	//now overwrite the entire contents of the file with the string that's in memory
	rewind($filePointer);
	fwrite($filePointer, $tempFileContents);	
?>