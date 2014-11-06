<?php
    $tempFileContents='';

    $POSTDATA = file_get_contents("php://input");
    $POSTDATA = json_decode($POSTDATA, true);
    $listIndex = $POSTDATA['listIndex'];

    $filePointer = @fopen("../lists/".$listIndex.".txt", "r");	//"r" is for read-only, starting at top
    if (!$filePointer) {
        exit;
    }

    //loop through each line, grabbing the contents only if this line is not
    //yet gotten (this will "throw away" the lines that are gotten)
    while (!feof($filePointer)) {
        $rawLine = fgets($filePointer, 999);
        $lineArray = explode('|', $rawLine);
        $isGotten = $lineArray[2];
        if (strpos($isGotten, "false") !== false)
        {
            $tempFileContents = $tempFileContents.$rawLine;
        }
    }

    //now overwrite the entire contents of the file with the string that's in memory
    fclose($filePointer);
    $filePointer = @fopen("../lists/".$listIndex.".txt", "w");	 //"w" so we start writing from the top
    fwrite($filePointer, $tempFileContents);
?>