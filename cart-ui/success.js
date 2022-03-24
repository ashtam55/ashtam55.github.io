var nameElement = document.getElementById("name");
var walletBalElement = document.getElementById("wallet_bal");
var userMobile = localStorage.getItem("userMobile");
var userName = localStorage.getItem("userName");
var walletBalance = localStorage.getItem("walletBalance");
if (userName != "") {
  nameElement.innerHTML = "Hi " + userName;
  console.log("dasdadasd");
} else {
  nameElement.innerHTML = "Hi " + userMobile;
  localStorage.setItem("userMobile", userMobile);
}
walletBalElement.innerHTML = walletBalance;