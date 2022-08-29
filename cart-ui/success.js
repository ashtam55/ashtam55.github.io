var nameElement = document.getElementById("name");
var walletBalElement = document.getElementById("wallet_bal");
var userMobile = localStorage.getItem("userMobile");
var userName = localStorage.getItem("userName");
var walletBalance = localStorage.getItem("walletBalance");
var deductedWalBal = localStorage.getItem("totalCartBalance");
var totalSavings = localStorage.getItem("cartSavings");
var userID = localStorage.getItem("UserId");

const firebaseConfig = {
  apiKey: "AIzaSyDp-KZ6mW40EPpy48kYqg2mcxjL8olzi7E",
  authDomain: "dashboard-57331.firebaseapp.com",
  databaseURL: "https://dashboard-57331-default-rtdb.firebaseio.com",
  projectId: "dashboard-57331",
  storageBucket: "dashboard-57331.appspot.com",
  messagingSenderId: "978966435775",
  appId: "1:978966435775:web:c5890ce905495f4894330a"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = fb.database();
const dbRef = fb.database().ref();

const usersRef = dbRef.child('dummydata');




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
console.log(jsonItems)
jsonItems.forEach(function (order, index) {

  console.log(index);
  // index = index + 1;
  delete jsonItems[index].mrp;
  delete jsonItems[index].strikePrice;
  delete jsonItems[index].weight;
  delete jsonItems[index].star;
  delete jsonItems[index].itemID;
  delete jsonItems[index].itemPrice;
  delete jsonItems[index].quantity;

  jsonItems[index].barcode = "283129";


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
var orderID = localStorage.getItem("orderId")

console.log(orderID, typeof (orderID))
console.log(today, typeof (today))
console.log(userMobile, typeof (userMobile))

var bodyToSend = {
  "order_id": orderID,
  "user_mobile": userMobile,
  "payment_details": {
    "payment_id": "id4",
    "pay_type": {
      "wallet": parseInt(deductedWalBal, 10),
      "cashback": 0
    },
    "paymode": "online",
    "date_of_payment": today,
    "total_amount": parseInt(walletBalance, 10),
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
  pushDataToSap("http://192.168.1.192:85/api/order_collection", bodyToSend)
    .then(data => {
      console.log(data);
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + ' ' + time;
      usersRef.child('customers/' + userID).update({
        outTime: dateTime
      });
      localStorage.clear()
    })
} else {
  console.log("Cart Is Empty Not pushing to SAP");
}