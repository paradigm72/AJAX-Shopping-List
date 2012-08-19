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