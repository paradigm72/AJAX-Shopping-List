<?php
    /*$filePointer = @fopen("../lists/1.txt", "r");	//"r" is for read-only, starting at top
    if (!$filePointer) {
        exit;
    }*/

    $tempFileContents='';

    //now overwrite the entire contents of the file with the string that's in memory
    fclose($filePointer);
    $filePointer = @fopen("../lists/1.txt", "w");	 //"w" so we start writing from the top
    fwrite($filePointer, $tempFileContents);
?>