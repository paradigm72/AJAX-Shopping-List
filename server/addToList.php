<?php

	//error_reporting(E_ALL | E_STRICT);
	//ini_set('display_errors', 'On');
	
	//FirePHP debugging
	require_once('FirePHPCore/FirePHP.class.php');
	ob_start();
	$firephp = FirePHP::getInstance(true);

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

	////////////////////////////
	/// ADD ITEM TO THIS SHOPPING LIST 
	////////////////////////////
	//get the item name
	$POSTDATA = file_get_contents("php://input");
	$POSTDATA = json_decode($POSTDATA, true);
	$itemName = $POSTDATA['itemName'];

	$firephp->log($itemName, "itemName");
	
	//strip HTML characters, encode to % tokens
	$itemName=strip_tags($itemName);
	$itemName=rawurlencode($itemName);
	
	if (strlen($itemName)==0) { exit; }

	//open file for appending (start after the last pre-existing line)
	$filePointer = @fopen("../lists/1.txt", "a");	
	if (!$filePointer) { exit; }
	
	//add the item as "new"	
	fwrite($filePointer,$itemName."||false\n");
?>