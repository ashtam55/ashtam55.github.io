//Validate User
//Fetching user wallet details
//send user to cart page

// var text = document.getElementById('loadingText')
// var walletBal = document.getElementById('walletBalance')

// function validateUser(){
//     text.innerHTML = "Validating User ...";
//     setTimeout(function() {
//         text.innerHTML = "User Validation Done.";
//         }, 1000);
// }


// function fetchWallet(){
//     text.innerHTML = "Fetching Wallet Balance ...";
//     setTimeout(function() {
//         walletBal.innerHTML = "500";
//         }, 1000);
// }



// const button = document.querySelector("button");
const div = document.getElementById("loadingText");

const setText = (text) => {
  div.textContent = text
}

const checkAuth = () => {
  return new Promise((resolve, reject) => {
    setText('Checking Auth...')
    console.log(localStorage.getItem("User"))
    setTimeout(() => {
      resolve(true);
    }, 5000);
  });
};

const fetchUser = () => {
  return new Promise((resolve, reject) => {
    setText('Fetching User...');
    setTimeout(() => {
      resolve({ name: "Max" });
    }, 2000);
  });
};

// button.addEventListener("click", () => {
  checkAuth()
     .then(
        isAuth => {
          if (isAuth) {
            return fetchUser()
          }
        }
      )
      .then(
        user => {
            window.location.href = "cart.html";
        }
      );
// });
