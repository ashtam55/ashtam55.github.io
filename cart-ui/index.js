// load();
// var _gaq = _gaq || [];
//   _gaq.push(['_setAccount', 'UA-24451557-1']);
//   _gaq.push(['_trackPageview']);

//   (function() {
//     var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//     ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//   })();

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete"
        || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {
    var resultContainer = document.getElementById('qr-reader-results');
    var lastResult, countResults = 0;
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            // Handle on success condition with the decoded message.
            console.log(`Scan result ${decodedText}`, decodedResult);
            // console.log("yoyo", JSON.parse(decodedText).message);
            processQRResults(JSON.parse(decodedText), decodedResult);
        }
    }
    function onScanFailure(error) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        // console.warn(`Code scan error = ${error}`);
    }

    var html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 30, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
});

async function userDetail(url = '', data) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function processQRResults(_qrdata, data) {

    console.log(_qrdata);
    console.log(data.decodedText);

    if (_qrdata.message.toString() == "You are logged out") {
        // alert("Please login again")
    }
    else {
        // alert(_qrdata.message);
        localStorage.setItem("UserId", _qrdata.data.user_id);
        localStorage.setItem("UserJson", data.decodedText);
        console.log(_qrdata.data.user_id)
        var json = localStorage.getItem("UserJson");
        console.log(JSON.parse(json));
        userDetail("http://192.168.1.192:85/api/user_details", _qrdata).then(data => {
            console.log(data);
        })

        window.location.href = "second.html";

    }
}