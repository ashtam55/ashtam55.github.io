//DummyData
const data = [{
    id: 1,
    img: "./assets/tatasalt_og 1.png",
    name: "Tata Salt",
    star: "4",
    weight: "1kg",
    strikePrice: "₹50",
    mrp: "₹28",
    quantity: 2,
    totalPrice: "₹56.00"
  },
  {
    id: 2,
    img: "./assets/tatasalt_og 1.png",
    name: "Head & Shoulders",
    star: "3",
    weight: "1kg",
    strikePrice: "₹50",
    mrp: "₹28",
    quantity: 2,
    totalPrice: "₹56.00"
  },
  {
    id: 3,
    img: "./assets/tatasalt_og 1.png",
    name: "Head & Shoulders",
    star: "3",
    weight: "1kg",
    strikePrice: "₹50",
    mrp: "₹28",
    quantity: 2,
    totalPrice: "₹56.00"
  },
  {
    id: 4,
    img: "./assets/tatasalt_og 1.png",
    name: "Head & Shoulders",
    star: "3",
    weight: "1kg",
    strikePrice: "₹50",
    mrp: "₹28",
    quantity: 2,
    totalPrice: "₹56.00"
  }
];

var mqtt;
var reconnectTimeout = 2000;
var host = "15.206.66.251";
var port = 8083;

function onFailure(message) {
  console.log("Connection Attempt to Host " + host + "Failed");
  setTimeout(MQTTconnect, reconnectTimeout);
}

function onMessageArrived(msg) {
  out_msg = "Message received " + msg.payloadString + "<br>";
  out_msg = out_msg + "Message received Topic " + msg.destinationName;
  
  if (msg.destinationName == "admin/cart1/added_weight"){
    console.log(out_msg);
  }
  else if(msg.destinationName == "admin/cart1/label"){
    console.log(out_msg);
  }

}

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.

  console.log("Connected ");
  mqtt.subscribe("admin/cart1/added_weight");
  mqtt.subscribe("admin/cart1/label");

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
  strike.innerHTML = order.strikePrice;
  _2p.innerHTML = order.mrp;
  _3h2.innerHTML = "Quantity: ";
  _1h3.innerHTML = order.quantity;
  span2.innerHTML = "*";
  _2h3.innerHTML = order.mrp + " ";
  span3.innerHTML = " =";
  _1h1.innerHTML = order.totalPrice;


}

MQTTconnect();


data.forEach(function (order) {
  buildCartItem(order)
})
