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
            processQRResults(JSON.parse(decodedText));
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

function processQRResults(_qrdata) {

    console.log(_qrdata.data.user_id)

    if (_qrdata.message.toString() == "You are logged out") {
        // alert("Please login again")
    }
    else {
        // alert(_qrdata.message);
        localStorage.setItem("User",_qrdata.data.user_id);
        window.location.href = "second.html";

    }
}