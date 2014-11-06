<?php
    //get the item index
    $POSTDATA = file_get_contents("php://input");
    $POSTDATA = json_decode($POSTDATA, true);
    $listIndex = $POSTDATA['listIndex'];

    $filePointer = @fopen("../lists/".$listIndex.".txt", "rw");
	
	if (!$filePointer) {
		exit;
	}
	
	header('Content-Type: text/json');
	/*echo "<?xml version=\"1.0\" ?>";
	echo "<list>";*/
	echo "[";
	
	while (!feof($filePointer)) {
		$rawLine = fgets($filePointer, 999);
		$lineArray = explode('|', $rawLine);
		
		if ((strlen($lineArray[0])>0)&&(strlen($lineArray[2])>0)) {
			$responseStr = $responseStr."{ ";
			$responseStr = $responseStr."\"text\": \"".$lineArray[0]."\", ";
            $responseStr = $responseStr."\"isGotten\": ".
                                        substr($lineArray[2],0,-1);
			$responseStr = $responseStr."},";
		}
	}
	$responseStr = substr($responseStr, 0, -1);
	/*echo "</list>";*/
	echo $responseStr;
	echo "]";
?>
