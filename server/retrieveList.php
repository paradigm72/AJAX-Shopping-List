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
	
	header('Content-Type: text/xml');
	echo "<?xml version=\"1.0\" ?>";
	echo "<list>";
	
	while (!feof($filePointer)) {
		$rawLine = fgets($filePointer, 999);
		$lineArray = explode('|', $rawLine);
		
		if (strlen($lineArray[0])>0) {
			echo "<listItem>";
			echo "<itemName>".$lineArray[0]."</itemName>";
			if ($lineArray[2]==1) {
				echo "<gotten>1</gotten>";
			}
			else {
				echo "<gotten>0</gotten>";
			}			
			echo "</listItem>";
		}
	}
	echo "</list>";
?>
