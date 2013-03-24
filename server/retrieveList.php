<?php
/**
* Paul Romine
* (c) 2011
*	NAME: 		retrieveList.php
*	PURPOSE: 	Server code to get the shopping list contents and fill into the list.
*             Generates XML of the form:
*					list
*						listItem
*							itemName Apples /itemName
*							gotten 0 /gotten
*						/listItem
*					/list
*
* LAST REVISED: 6/12/11
*/

	$filePointer = @fopen("../lists/1.txt", "rw");
	
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
		
		if (strlen($lineArray[0])>0) {
			$responseStr = $responseStr."{ ";
			$responseStr = $responseStr."\"text\": \"".$lineArray[0]."\", ";
			if ($lineArray[2]==1) {
				$responseStr = $responseStr."\"isGotten\": \1\"";
			}
			else {
				$responseStr = $responseStr."\"isGotten\": \"0\"";
			}			
			$responseStr = $responseStr."},";
		}
	}
	$responseStr = substr($responseStr, 0, -1);
	/*echo "</list>";*/
	echo $responseStr;
	echo "]";
?>
