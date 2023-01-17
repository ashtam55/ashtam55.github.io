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
var mqtt;
var reconnectTimeout = 2000;
var host = "15.207.222.251";
var port = 8083;
function onFailure(message) {
    console.log("Connection Attempt to Host " + host + "Failed");
    setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived(msg) {
    out_msg = "Message received " + msg.payloadString + "<br>";
    out_msg = out_msg + "Message received Topic " + msg.destinationName;
    console.log(msg.payloadString, msg.destinationName)
    var common = msg.destinationName.split("/");
    var devID = common[2];
    var topic = common[3];
    // console.log(topic, devID)
    // console.log(common[0], common[1], common[2]);
    if (topic == "QRCode") {
        var data = JSON.parse(msg.payloadString);
        processQRResults(data, msg.payloadString);
    }
}

function onConnect() {
    // Once a connection has been made, make a subscription and send a message.

    console.log("Connected ");
    // mqtt.subscribe("admin/cartv1/e45f01090250/added_weight");
    mqtt.subscribe("admin/cartv1/e45f01090250/QRCode");

}

function onConnectionLost(err) {
    console.log("Connection Lost!!!", err);
    MQTTconnect();

}
function MQTTconnect() {
    console.log("connecting to " + host + " " + port);
    var x = Math.floor(Math.random() * 10000);
    var cname = "CartID - Index - " + x;
    mqtt = new Paho.MQTT.Client(host, port, cname);
    //document.write("connecting to "+ host);
    var options = {
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure,
    };
    mqtt.onMessageArrived = onMessageArrived
    mqtt.onConnectionLost = onConnectionLost;

    mqtt.connect(options); //connect

}


MQTTconnect();

// docReady(function () {
//     var resultContainer = document.getElementById('qr-reader-results');
//     var lastResult, countResults = 0;
//     function onScanSuccess(decodedText, decodedResult) {
//         if (decodedText !== lastResult) {
//             ++countResults;
//             lastResult = decodedText;
//             // Handle on success condition with the decoded message.
//             console.log(`Scan result ${decodedText}`, decodedResult);
//             // console.log("yoyo", JSON.parse(decodedText).message);
//             processQRResults(JSON.parse(decodedText), decodedResult);
//         }
//     }
//     function onScanFailure(error) {
//         // handle scan failure, usually better to ignore and keep scanning.
//         // for example:
//         // console.warn(`Code scan error = ${error}`);
//     }

//     var html5QrcodeScanner = new Html5QrcodeScanner(
//         "qr-reader", { fps: 30, qrbox: 250 });
//     html5QrcodeScanner.render(onScanSuccess);
// });

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

function processQRResults(_qrdata, dataInString) {

    console.log(_qrdata);
    // console.log(data.decodedText);

    if (_qrdata.message.toString() == "You are logged out") {
        // alert("Please login again")
    }
    else {
        // alert(_qrdata.message);
        localStorage.setItem("UserId", _qrdata.data.user_id);
        localStorage.setItem("UserJson", dataInString);
        console.log(_qrdata.data.user_id)
        var json = localStorage.getItem("UserJson");
        console.log(JSON.parse(json));
        userDetail("http://192.168.1.192:85/api/user_details", _qrdata).then(data => {
            console.log(data);
        })

        window.location.href = "second.html";

    }
}