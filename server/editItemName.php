<?php
	//Need to turn off "magic quotes" (my hosting runs on PHP 5.3 or earlier, apparently)
	if (get_magic_quotes_gpc()) {
    $process = array(&$_GET, &$_POST, &$_COOKIE, &$_REQUEST);
    while (list($key, $val) = each($process)) {
        foreach ($val as $k => $v) {
            unset($process[$key][$k]);
            if (is_array($v)) {
                $process[$key][stripslashes($k)] = $v;
                $process[] = &$process[$key][stripslashes($k)];
            } else {
                $process[$key][stripslashes($k)] = stripslashes($v);
            }
        }
    }
    unset($process);
    }

    $POSTDATA = file_get_contents("php://input");
    $POSTDATA = json_decode($POSTDATA, true);
	$itemIndex = $POSTDATA['itemIndex'];
	$itemNewName = $POSTDATA['itemNewName'];
    $itemOriginalName = $POSTDATA['itemOriginalName'];
    $listIndex = $POSTDATA['listIndex'];
	
	$itemNewName = rawurlencode($itemNewName);
	
	
	$filePointer = @fopen("../lists/".$listIndex.".txt", "r");
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

    //check whether the original name matches - if not, bail
    $itemOriginalName=strip_tags($itemOriginalName);
    $itemOriginalName=rawurlencode($itemOriginalName);
    if (strcmp($itemOriginalName, $lineArray[0]) != 0) {
        exit;
    }

    //fetch whether this item is 'gotten' or not
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
	$filePointer = @fopen("../lists/".$listIndex.".txt", "w");
	fwrite($filePointer, $tempFileContents);	
?>