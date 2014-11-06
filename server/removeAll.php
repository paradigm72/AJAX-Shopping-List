<?php
    /*$filePointer = @fopen("../lists/1.txt", "r");	//"r" is for read-only, starting at top
    if (!$filePointer) {
        exit;
    }*/

    $tempFileContents='';

    $POSTDATA = file_get_contents("php://input");
    $POSTDATA = json_decode($POSTDATA, true);
    $listIndex = $POSTDATA['listIndex'];

    //now overwrite the entire contents of the file with the string that's in memory
    fclose($filePointer);
    $filePointer = @fopen("../lists/".$listIndex.".txt", "w");	 //"w" so we start writing from the top
    fwrite($filePointer, $tempFileContents);
?>
?>