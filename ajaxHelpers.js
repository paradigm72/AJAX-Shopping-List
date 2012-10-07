/////////////////////////////////////////////////////////////////////////
// INITIALIZE AJAX OBJECT  (copied from PHP and MySQL Web Development, //
//							4th edition, Welling/Thomson)			   //
/////////////////////////////////////////////////////////////////////////

//create the namespace if not already created
var com;
if (!com) {
	com = {};
}
if (!com.letxbe) {
	com.letxbe = {};
}


com.letxbe.AJAXCore = function() {
	var myReq;

	function initXMLHTTPRequest() {
		myReq = false;
		try {
			/* for non-IE */
			myReq = new XMLHttpRequest();
		}	catch (err) {
			try {
				/* for IE, try 1 */
				myReq = new ActiveXObject("Msxml2.XMLHTTP");
			}	catch (err) {
				try {
					/* for IE, try 2 */
					myReq = new ActiveXObject("Microsoft.XMLHTTP");
					}	catch (err) {
						myReq = false;
				}
			}
		}
	}
	
	function getReqObject() {
		return myReq;
	}
	
	return {
		InitXMLHTTPRequest: function() { initXMLHTTPRequest(); },
		Req: function() { return getReqObject(); }
	}
	
}();



/*
var oldonload = window.onload;
if (typeof window.onload != 'function'){
	window.onload = com.letxbe.AJAXCore.InitXMLHTTPRequest;
} else {
	window.onload = function() {
		com.letxbe.AJAXCore.InitXMLHTTPRequest;
		oldonload();
	}
}
*/
