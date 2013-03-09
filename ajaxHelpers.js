/////////////////////////////////////////////////////////////////////////
// INITIALIZE AJAX OBJECT  (copied from PHP and MySQL Web Development, //
//							4th edition, Welling/Thomson)			   //
/////////////////////////////////////////////////////////////////////////
function getXMLHTTPRequest() {
	var req = false;
	try {
		/* for non-IE */
		req = new XMLHttpRequest();
	}	catch (err) {
		try {
			/* for IE, try 1 */
			req = new ActiveXObject("Msxml2.XMLHTTP");
		}	catch (err) {
			try {
				/* for IE, try 2 */
				req = new ActiveXObject("Microsoft.XMLHTTP");
				}	catch (err) {
					req = false;
			}
		}
	}
	return req;
}


function doAjaxRequest(relativeURL,paramDictionary,responseFunc) {
	//construct the PHP URL, with a random GET param to force no cache use
	myRand = parseInt(Math.random()*99999999);
	var theURL = relativeURL + "?rand=" + myRand;
	
	//construct the POST param from the parameter dictionary
	for (key in paramDictionary) {
		if(paramDictionary.hasOwnProperty(key)) {
			var postParam = postParam + "&" + key + "=" + paramDictionary[key];
		}
	}
	//slice off the leading &
	if (!(postParam === undefined)) {
		var extraChar = "&";
		postParam = postParam.slice(extraChar.length);	
	}

	//send off the AJAX request
	myReq.open("POST", theURL, true);
	myReq.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	myReq.onreadystatechange = responseFunc;
	myReq.send(postParam);
}