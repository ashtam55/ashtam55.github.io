var orderList = [];
var mqtt;
var reconnectTimeout = 2000;
var host = "15.206.66.251";
var port = 8083;
var nameElement = document.getElementById("name");
var walletBalElement = document.getElementById("wallet_bal");
var userMobile = localStorage.getItem("userMobile");
var userName = localStorage.getItem("userName");
var waitingVar = {};
if (userName != "") {
  nameElement.innerHTML = "Hi " + userName;
  console.log("dasdadasd");
} else {
  nameElement.innerHTML = "Hi " + userMobile;
  localStorage.setItem("userMobile", userMobile);
}
walletBalElement.innerHTML = localStorage.getItem("walletBalance");

function onFailure(message) {
  console.log("Connection Attempt to Host " + host + "Failed");
  setTimeout(MQTTconnect, reconnectTimeout);
}
async function fetchProductDetails(url = '', data, body) {
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

function onMessageArrived(msg) {
  out_msg = "Message received " + msg.payloadString + "<br>";
  out_msg = out_msg + "Message received Topic " + msg.destinationName;

  if (msg.destinationName == "admin/cart1/added_weight") {
    // console.log(out_msg);
    var data = JSON.parse(msg.payloadString);
    var prodNumber = data.product_id;
    var quantity = data.quantity;
    var total = 55;
    // console.log("Yo ",prodNumber, quantity);
    let obj = orderList.find((o, i) => {
      if (o.id === prodNumber) {
        console.log("Found!!");
        //Updating in OrderList
        orderList[i].quantity = parseInt(o.quantity, 10) + parseInt(quantity, 10);
        total = parseInt(o.mrp, 10) * parseInt(orderList[i].quantity, 10);
        orderList[i].totalPrice = total;

        // buildCartItem(orderList[i]);
        // console.log(o.quantity);
        // stop searching
      }

      // buildCartItem(orderList);
      $('.row').remove();
      console.log("Removed");

      console.log(orderList);
      var cartTotal = 0;
      var savingsTotal = 0;
      orderList.forEach(function (order) {
        buildCartItem(order)
         cartTotal = parseInt(order.totalPrice,10) + cartTotal;
         savingsTotal = parseInt(order.strikePrice,10) * parseInt(order.quantity,10) + savingsTotal;
         
      })


      console.log("cart total -----",cartTotal, savingsTotal);
      document.getElementById("total").innerHTML = cartTotal;
      document.getElementById("savings").innerHTML = savingsTotal - cartTotal;
      localStorage.setItem("totalCartBalance", cartTotal);
      // console.log("cart total",cartTotal, savingsTotal);



    });
    // {"label" : "patanjali-honey-500g“,”product_id”:”202442","total_cart_weight":"2994.651855","product_weight_from_sensor":"721.254150","product_weight_from_label":"1000”, “quantity”:”2”}
    // {"label" : "patanjali-honey-500g","product_id":"202442"}
    //{"label" : "bournvita-","product_id":"201352","total_cart_weight":"25.218994","product_weight_from_sensor":"502.397400","product_weight_from_label":"5000","quantity":"1"}
  } else if (msg.destinationName == "admin/cart1/label") {
    //Check item if it exist in list

    console.log(out_msg);
    //removing colon from string
    var data = JSON.parse(msg.payloadString);
    // data = String(data.label).split(":");
    console.log(data.label, data.product_id);







    var bodyToSend = {
      "export": false,
      "search": "number",
      "value": data.product_id,
      "warehouse": "STR01"
    }
    fetchProductDetails("http://api.djtretailers.com/item/adminitems/?page_number=100&page_size=1", localStorage.getItem("UserToken"), bodyToSend)
      .then(data => {
        console.log(data.data.items[0].rating); // JSON data parsed by `data.json()` call
        //name, imageUrl, ratings, strikePrice, MRP
        var productName = data.data.items[0].name;
        var imgURL = data.data.items[0].images[0].url;
        var ratings = data.data.items[0].rating;
        var strikePrice = data.data.items[0].warehouses.MRP;
        var mrp = data.data.items[0].warehouses.ASP;
        var prodNumber = data.data.items[0].number;
        console.log(mrp, strikePrice);
        var singleObj = {}
        singleObj['img'] = imgURL;
        singleObj['name'] = productName;
        singleObj['star'] = ratings;
        singleObj['strikePrice'] = strikePrice;
        singleObj['mrp'] = mrp;
        singleObj['id'] = prodNumber;
        singleObj['quantity'] = 0;
        singleObj['weight'] = " ";

        // return 
        let obj = orderList.find(o => o.id === prodNumber);
        console.log(obj);

        if (typeof obj === "undefined") {
          console.log("---->>>Adding Item in List")

          orderList.push(singleObj);
          buildCartItem(singleObj);
          // orderList = [];
          // orderList.forEach(function (order) {
          //   buildCartItem(order)
          // })

        } else {
          console.log(" Item Already in List..Updating if requires")

        }
      })

    // {
    //   id: 4,
    //   img: "./assets/tatasalt_og 1.png",
    //   name: "Head & Shoulders",
    //   star: "3",
    //   weight: "1kg",
    //   strikePrice: "₹50",
    //   mrp: "₹28",
    //   quantity: 2,
    //   totalPrice: "₹56.00"
    // }

    // var listOfObjects = [];
    // var a = ["car", "bike", "scooter"];
    // a.forEach(function (entry) {
    //   var singleObj = {}
    //   singleObj['type'] = 'vehicle';
    //   singleObj['value'] = entry;
    //   listOfObjects.push(singleObj);
    // });


  } else if (msg.destinationName == "admin/cart1/removed_weight") {
    console.log(out_msg);
  }

}

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.

  console.log("Connected ");
  mqtt.subscribe("admin/cart1/added_weight");
  mqtt.subscribe("admin/cart1/label");
  mqtt.subscribe("admin/cart1/removed_weight");


  // message = new Paho.MQTT.Message("Hello World");
  // message.destinationName = "sensor2";
  // message.retained = true;
  // mqtt.send(message);
}

function MQTTconnect() {
  console.log("connecting to " + host + " " + port);
  var x = Math.floor(Math.random() * 10000);
  var cname = "CartID -" + x;
  mqtt = new Paho.MQTT.Client(host, port, cname);
  //document.write("connecting to "+ host);
  var options = {
    timeout: 3,
    onSuccess: onConnect,
    onFailure: onFailure,
  };
  mqtt.onMessageArrived = onMessageArrived

  mqtt.connect(options); //connect
}

const buildCartItem = function (order) {
  // Create elements needed to build a card

  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  const div3 = document.createElement("div");
  const div4 = document.createElement("div");
  const div5 = document.createElement("div");
  const div6 = document.createElement("div");
  const div7 = document.createElement("div");
  const div8 = document.createElement("div");
  const img = document.createElement("img");
  const _1h2 = document.createElement("h2");
  const _2h2 = document.createElement("h2");
  const _3h2 = document.createElement("h2");
  const _1h3 = document.createElement("h3");
  const _2h3 = document.createElement("h3");
  const _1h1 = document.createElement("h1");
  const _1p = document.createElement("p");
  const _2p = document.createElement("p");
  const br = document.createElement("br");
  const span = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");
  const strike = document.createElement("strike");


  const main = document.querySelector(".container");
  main.append(div1);
  div1.append(div2);
  div2.append(div3);
  div2.append(div7);
  div7.append(div8);
  div8.append(_3h2);
  div8.append(_1h3);
  div8.append(span2);
  div8.append(_2h3);
  div8.append(span3);
  div8.append(_1h1);
  div3.append(div4);
  div3.append(div5);
  div3.append(div6);
  div4.append(img);
  div5.append(_1h2);
  div5.append(_1p);
  _1p.append(span);
  div6.append(_2h2);
  div6.append(_2p);
  _2p.append(br);
  _2p.append(strike);


  div1.setAttribute("class", "row");
  div2.setAttribute("class", "grid grid-flow-row-dense justify-center align-center items-center text-center grid-cols-3 grid-rows-2");
  div3.setAttribute("class", "col-span-2 flex flex-row mt-10 -mb-14");
  div4.setAttribute("class", "image justify-center flex align-center text-center ml-7 mr-10");
  div5.setAttribute("class", "title flex flex-col justify-between ml-4");
  div6.setAttribute("class", "rate flex flex-col ml-auto mr-12");
  div7.setAttribute("class", "side");
  div8.setAttribute("class", "mt-10 flex flex-row justify-center");
  _3h2.setAttribute("class", "text-base font-semibold 2xl:text-xl text-txt");
  _1h3.setAttribute("class", "text-base 2xl:text-xl text-txt ml-3");
  span2.setAttribute("class", "text-base 2xl:text-xl text-txt ml-3");
  _2h3.setAttribute("class", "text-base 2xl:text-xl text-txt ml-3");
  span3.setAttribute("class", "equal");
  _1h1.setAttribute("class", "text-base 2xl:text-xl text-txt ml-3");
  _1h2.setAttribute("class", "text-base font-semibold 2xl:text-xl text-txt mr-auto");
  _1p.setAttribute("class", "text-base text-gray-400 mb-6 font-bold text-yellow 2xl:text-lg mr-auto");
  _2h2.setAttribute("class", "text-base 2xl:text-xl text-txt ml-3");
  _2p.setAttribute("class", "text-base 2xl:text-xl text-txt ml-3");
  strike.setAttribute("class", "text-gray-400");
  //Setting Data to cards
  img.setAttribute("src", order.img);
  _1h2.innerHTML = order.name;
  // Adding Start/rating to element
  for (let i = 0; i < order.star; i++) {
    span.innerHTML = span.innerHTML + " &#x1F31F ";
  }
  _2h2.innerHTML = order.weight;
  strike.innerHTML = order.mrp;
  _2p.innerHTML = order.strikePrice;
  _3h2.innerHTML = "Quantity: ";
  _1h3.innerHTML = order.quantity;
  span2.innerHTML = "*";
  _2h3.innerHTML = order.mrp + " ";
  span3.innerHTML = " =";
  _1h1.innerHTML = order.totalPrice;


}

MQTTconnect();





//------------Fixed Header JS--------------//
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}