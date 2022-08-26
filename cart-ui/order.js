var nameElement = document.getElementById("name");
var walletBalElement = document.getElementById("wallet_bal");
var userMobile = localStorage.getItem("userMobile");
var userName = localStorage.getItem("userName");
var walletBalance = parseInt(localStorage.getItem("walletBalance"), 10);
var totalCartBalance = parseInt(localStorage.getItem("totalCartBalance"), 10);
console.log(totalCartBalance);
var waitingVar = {};
if (userName != "") {
  nameElement.innerHTML = "Hi " + userName;
  console.log("dasdadasd");
} else {
  nameElement.innerHTML = "Hi " + userMobile;
  localStorage.setItem("userMobile", userMobile);
}
walletBalElement.innerHTML = walletBalance;

document.getElementById("totalCartBalance").innerHTML = "₹ " + totalCartBalance;

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

function payment() {
  console.log("Deerika Wallet Payment Initiated");
  console.log(totalCartBalance, walletBalance);
  if (totalCartBalance > walletBalance) {
    console.log("Insufficient Funds");
    alert("Insufficient Funds. Please add");
  } else if (walletBalance > totalCartBalance || totalCartBalance < walletBalance) {
    console.log("Processing payment");


    var bodyToSend = {
      "mobile": localStorage.getItem("userMobile"),
      "amount": parseInt(totalCartBalance, 10),
      "description": "Amount debited from wallet"
    }

    var bill_no = "SMARTSTORE/" + Math.floor(Math.random() * 1000) + "/8";
    var newBodyToSend = {
      "mobile": localStorage.getItem("userMobile"),
      "wallet": parseInt(totalCartBalance, 10),
      "cashback": "0",
      "bill_no": bill_no,
      "bill_value": "1125"
    }
    console.log(newBodyToSend)
    console.log(bodyToSend);
    console.log(localStorage.getItem("UserToken"));
    fetchFromWallet("http://dev.djtretailers.com/v2/wallet/admin/debit", localStorage.getItem("UserToken"), newBodyToSend)
      .then(data => {
        console.log(data);
        if (data.success == true) {
          console.log(data.data.amount.wallet);
          localStorage.setItem("walletBalance", data.data.amount.wallet);
          window.location.href = "success.html";
        } else {
          console.log("error", data);
        }

      })


  }

}