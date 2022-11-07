var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
            console.log("ok mec")
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}

httpGetAsync("127.0.0.1:5001/Website/web.js", (result) => {
    console.log(result);
})