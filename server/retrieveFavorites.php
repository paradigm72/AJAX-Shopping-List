<?php
/**
* Paul Romine
* (c) 2012
*	NAME: 		retrieveFavorites.php
*	PURPOSE: 	Server code to get the current list of favorite items 
*               (based on history), so it can be stored in Javascript
*             Generates XML of the form:
*					list
*						listItem
*							itemName Apples /itemName
*							count 3 /count
*						/listItem
*					/list
*
* LAST REVISED: 8/24/12
*/

	$filePointer = @fopen("../lists/favorites.txt", "rw");
	
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
			echo "<itemCount>".$lineArray[1]."</itemCount>";
			echo "</listItem>";
		}
	}
	echo "</list>";
?>