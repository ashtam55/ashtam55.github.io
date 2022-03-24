var nameElement = document.getElementById("name");
var walletBalElement = document.getElementById("wallet_bal");
var userMobile = localStorage.getItem("userMobile");
var userName = localStorage.getItem("userName");
var walletBalance = localStorage.getItem("walletBalance");
var totalCartBalance = localStorage.getItem("totalCartBalance");
var waitingVar = {};
if (userName != "") {
  nameElement.innerHTML = "Hi " + userName;
  console.log("dasdadasd");
} else {
  nameElement.innerHTML = "Hi " + userMobile;
  localStorage.setItem("userMobile", userMobile);
}
walletBalElement.innerHTML = walletBalance;

document.getElementById("totalCartBalance").innerHTML = "₹ "+ totalCartBalance;

async function fetchFromWallet(url = '', data, body) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Authorization': 'bearer ' + data,
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(body) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

function payment(){
    console.log("Deerika Wallet Payment Initiated");
    console.log(totalCartBalance,walletBalance);
    // if(totalCartBalance > walletBalance ){
    //     console.log("Insufficient Funds");
    //     alert("Insufficient Funds. Please add");
    // }
    // else if(walletBalance > totalCartBalance || totalCartBalance < walletBalance){
    //     console.log("Processing payment");

        
        var bodyToSend = {
            "mobile": localStorage.getItem("userMobile"),
            "amount": parseInt(totalCartBalance,10),
            "description": "Amount debited from wallet"
            }
            fetchFromWallet("http://a0081d9e6be6746e9bf613dc166a53ac-75257c64ea2c0cf3.elb.ap-northeast-3.amazonaws.com/walletAdmin/debit_wallet/", localStorage.getItem("UserToken"), bodyToSend)
            .then(data => {
                console.log(data.success);
                if(data.success == true){
                console.log(data.amount);
                localStorage.setItem("walletBalance",data.amount);
                window.location.href="success.html";
                }
                else{
                    console.log("error",data);
                }

            })

      
    // }

}