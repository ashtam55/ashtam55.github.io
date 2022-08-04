var nameElement = document.getElementById("name");
var walletBalElement = document.getElementById("wallet_bal");
var userMobile = localStorage.getItem("userMobile");
var userName = localStorage.getItem("userName");
var walletBalance = localStorage.getItem("walletBalance");
var deductedWalBal = localStorage.getItem("totalCartBalance");
var totalSavings = localStorage.getItem("cartSavings");

if (userName != "") {
  nameElement.innerHTML = "Hi " + userName;
  console.log("dasdadasd");
} else {
  nameElement.innerHTML = "Hi " + userMobile;
  localStorage.setItem("userMobile", userMobile);
}
walletBalElement.innerHTML = walletBalance;

const controller = new AbortController();

const timeoutId = setTimeout(() => controller.abort(), 15000);

// const req = async () => {
//   const response = await fetch(url, {
//     signal: controller.signal
//   });
//   //...
//   clearTimeout(timeoutId);
// };
// req();

async function pushDataToSap(url = '', body) {
  // Default options are marked with *
  const response = await fetch(url, {
    // signal: controller.signal,
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      // 'Authorization': 'bearer ' + data,
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(body) // body data type must match "Content-Type" header
  });
  // clearTimeout(timeoutId);

  return response.json(); // parses JSON response into native JavaScript objects
}

var jsonItems = JSON.parse(localStorage.getItem("items"));

jsonItems.forEach(function (order, index) {

  console.log(order.fulfilled_quantity);
  delete order.mrp;
  delete order.weight;
  delete order.strikePrice;
  delete order.star;
  if (order.fulfilled_quantity == 0) {
    console.log("asd");
    jsonItems.splice(index, 1);
  }


})

console.log(jsonItems);
// console.log(JSON.parse(jsonItems.slice(1, -1)));
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
// document.write(today);

console.log(userMobile);
var orderID = "SMART" + Math.floor(Math.random() * 10000);

console.log(orderID, typeof (orderID))
console.log(today, typeof (today))
console.log(userMobile, typeof (userMobile))

var bodyToSend = {
  "order_id": orderID,
  "user_mobile": userMobile,
  "payment_details": {
    "payment_id": "id4",
    "pay_type": {
      "wallet": deductedWalBal,
      "cashback": 0
    },
    "paymode": "online",
    "date_of_payment": today,
    "total_amount": deductedWalBal,
    "saving": 12
  },
  "warehouse": {
    "_id": "6180d7a46217efe7efec8c03"
  },
  "item_data": jsonItems
}

var newS = {
  "message": "Details fetched Successfully",
  "success": true,
  "data": {
    "user_id": "61d67836422ca5c08961d3bd",
    "mobile": "8076592211",
    "name": "Somya jain",
    "email": "somyajain210220@gmail.com",
    "notification_token": "fH3BmUXGRbeMl5TZ5fvHPM:APA91bEdcg4vySATBFK4RWzBtugp_WtEI6d10s0nb3lVkjCd2_rGC71y0dcx_E9ZYMZPEGGvs_kc3kWZ2Ak2_3UxYwoEfTQXMWQGyl7JPmdfSPDrWHXBcrJ7EFrHyJkoELeCFJu6Oc9z",
    "is_member": false,
    "membership_id": null,
    "membership_with_free_items": 0
  }
}

console.log(bodyToSend);
const isEmpty = Object.keys(jsonItems).length === 0;

if (!isEmpty) {
  pushDataToSap("http://192.168.1.192:85/api/user_details", newS)
    .then(data => {
      console.log(data);
    })
} else {
  console.log("Cart Is Empty Not pushing to SAP");
}