

// const button = document.querySelector("button");
const div = document.getElementById("loadingText");

const setText = (text) => {
  div.textContent = text
}


// Example POST method implementation:
async function generatingToken(url = '', data) {
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

async function fetchWallet(url = '', data) {
  console.log(url,data);
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Authorization':'bearer '+data,
      'Content-Type': 'application/json',
      

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}




var json = localStorage.getItem("UserJson");
console.log(json);
var userMobile = JSON.parse(json).data.mobile;
console.log(userMobile);
var userName = JSON.parse(json).data.name;
if(userName != ""){
  document.getElementById('name').innerHTML = "Hi "+ userName;
  localStorage.setItem("userName",userName);
  console.log("dasdadasd");
}
else{
  document.getElementById('name').innerHTML = "Hi "+ userMobile;
  localStorage.setItem("userMobile",userMobile);
  console.log("12313123");

}
div.innerHTML = "Generating Token";
generatingToken('http://aaf0c21919fc7446a80a01b571d85edd-502ca277c7a8573b.elb.ap-northeast-3.amazonaws.com/auth/toke-generator/', JSON.parse(json))
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call

    console.log(data.access_token); // JSON data parsed by `data.json()` call
    localStorage.setItem("UserToken",data.access_token);
    var url = 'http://a0081d9e6be6746e9bf613dc166a53ac-75257c64ea2c0cf3.elb.ap-northeast-3.amazonaws.com/walletAdmin/user_details/?page_num=1&page_size=10&mobile='+ userMobile
    div.innerHTML = "Fetching Wallet Balance";
    return fetchWallet(url,data.access_token);
    
    // return fetchWallet('http://a0081d9e6be6746e9bf613dc166a53ac-75257c64ea2c0cf3.elb.ap-northeast-3.amazonaws.com/walletAdmin/user_details/?page_num=1&page_size=10&mobile=7060883183',data);
  }).then(data => {
    console.log("HELO",JSON.stringify(data)); // JSON data parsed by `data.json()` call
    console.log("WAllet",data.data.data[0].wallet_amount);
    localStorage.setItem("walletBalance",data.data.data[0].wallet_amount)
    window.location.href = "cart.html";
  })