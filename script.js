//Global variable for the current order number
// var orderNumber = 0;
//Object to hold all of the orders from a user- description, cost, method
//orders[orderNum] = {DESC:description, COST:cost, METHOD:method};
// var orders = {};

//Sign-up and log-in functionality

//Default values in the database. Can add users in the signUp() function
// var UserDB = [
//   {
//     username: "jspann1@gmail.com",
//     password: "testpw1",
//     loyaltyPoints: 0
//   },
//   {
//     username: "jgray1@gmail.com",
//     password: "test1234",
//     loyaltyPoints: 50
//   }, 
//   {
//     username: "jsabol1@gmail.com",
//     password: "pw!",
//     loyaltyPoints: 20
//   }
// ]

// localStorage.setItem("UserDB", JSON.stringify(UserDB));

function initializeDB() {
  let UserDB = [
    {
      username: "jspann1@gmail.com",
      password: "testpw1",
      loyaltyPoints: 0
    },
    {
      username: "jgray1@gmail.com",
      password: "test1234",
      loyaltyPoints: 50
    }, 
    {
      username: "jsabol1@gmail.com",
      password: "pw!",
      loyaltyPoints: 20
    }
  ];
  localStorage.setItem("UserDB", JSON.stringify(UserDB));
  return UserDB;
}

function logout() {
  var userJSON = localStorage.getItem("User");
  var user = JSON.parse(userJSON);
  var dbJSON = localStorage.getItem("UserDB");
  var db = JSON.parse(dbJSON);

  for(var i = 0; i < db.length; i++){
    if(user["username"] == db[i].username) {
      let points = parseInt(user["loyaltyPoints"]);
      db[i].loyaltyPoints = points;
      break;
    }
  }

  localStorage.removeItem("User");
  dbJSON = JSON.stringify(db);
  localStorage.setItem("UserDB", dbJSON);
}

function getInfo(){
  //Get the values from the input boxes
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  //Prompt the user is either field is blank
  if(username=="" || password=="")
  {
    alert("Incomplete information!");
    return;
  }

  //Get the latest UserDB from localStorage
  var UDB = localStorage.getItem("UserDB"); //getItem will return the UserDB as a string
  var localUDB;
  if(UDB === null)
    localUDB = initializeDB(); // create default values for DB if this is the first time its loaded
  else
    localUDB = JSON.parse(UDB); //use parse to convert back to original form
  console.log(localUDB);

  //Check the UserDB and see if this combination of username and password are in it
  for(var i = 0; i < localUDB.length; i++){
    //Condition for successful log-in
      if(username == localUDB[i].username && password == localUDB[i].password){
        alert(username + " has successfully logged in!");
        localStorage.setItem("User", JSON.stringify(localUDB[i]));
        window.location = "index.html";
        return;
      }
    //Condition for incorrect password for a user in the database
    else if(username == localUDB[i].username && password != localUDB[i].password){
        alert("Incorrect password for username: " + username);
        return;
    }
    }
  //Condition for username/password combo not being in the database
  alert("A user with this email and password are not in our database. Redirecting to the sign-up page...");
  window.location="signup.html";
}

function signUp(){
  //Get the username and the password from the input boxes
  var username = document.getElementById("usernameInput").value;
  var password = document.getElementById("passwordInput").value;
  var confirmation = document.getElementById("confirmPW").value;
  var inDB = false;

  //Get the latest UserDB from localStorage
  var UDB = localStorage.getItem("UserDB"); //getItem will return the UserDB as a string
  var localUDB = JSON.parse(UDB); //use parse to convert back to original form
  console.log(localUDB);

  //Basic error handling
  if(username == ""){
    alert("Username field cannot be empty!");
    return;
  }
  if(password == ""){
    alert("Password field cannot be empty!");
    return;
  }
  
  //Make sure the password and confirm password fields match
  if(password != confirmation){
    alert("Password and confirmation don't match!");
    return;
  }
  
  //Check the UserDB to see if the username/password is already there
  for(var i = 0; i < localUDB.length; i++){
    //Username is already in the database
      if(username == localUDB[i].username){
        alert(username + " already has an account! Please go to the log-in page.");
        window.location="login.html";
        return;
      }
    }

  //If not, create the object and add to the database
  var account = {
    username: username,
    password: password,
    loyaltyPoints: 50
  };
  localUDB.push(account);

  console.log(localUDB);
  
  //Update the UserDB in localStorage so the user's information is saved
  var JSONObject = JSON.stringify(localUDB);
  localStorage.setItem("UserDB", JSONObject);
  
  // alert("Successfully created an account for " + username + " and logged in! Returning to the previous screen...");
  alert("Successfully created account " + username);
  window.location = "login.html";
  // localStorage.setItem("User", JSON.stringify(account));

  //Redirect to the homepage instead of history.back() if the user came from the login page
  // if(history.back() == "login.html"){
  //   window.location= "index.html";
  // }
  // else{
  //   history.back();
  // }
}


//const to hold the prices of all the items
const prices = {
  "Milk":3,
  "Water":3,
  "Cola":4,
  "White_Claw":5,
  "Bud_Light":5,
  "Red_Wine":7,
  "Caesar_Salad":4,
  "Crab_Soup":4,
  "Bread_Sticks":6,
  "Club_Sandwich":7,
  "Pizza":8,
  "Chicken_Strips":7,
  "Peanuts":2,
  "Chips":2,
  "Pretzels":2
};

// Function for payment pages
function refresh() {
  
  var elemSummary = document.getElementById("orderSummary");
  var currOrderStr = localStorage.getItem("currOrder");
  if(currOrderStr === null)
    elemSummary.innerHTML = "Order Empty :(<br>";
  else
    elemSummary.innerHTML = toHTML(JSON.parse(currOrderStr));
  
  var elemHistory = document.getElementById("orderHistory");
  var historyStr = localStorage.getItem("history");
  if(historyStr === null)
    elemHistory.innerHTML = "No past purchases.<br>";
  else{
    elemHistory.innerHTML = toHTML(JSON.parse(historyStr));
  }
    
  var elemBalance = document.getElementById("pointBalance");
  if(elemBalance === null)
    return;

  var accountJSON = localStorage.getItem("User");
  if(accountJSON === null)
    elemBalance.innerHTML = "0";
  else {
    var account = JSON.parse(accountJSON);
    elemBalance.innerHTML = account["loyaltyPoints"];
  }
}

function getCurrentUsername() {
  var UserJSON = localStorage.getItem("User");
  if(UserJSON === null)
    return "";
  else
    return JSON.parse(UserJSON)["username"];
}

// Set the current order to foodOrder
function putFoodOrder(method) {
  //Get the latest database information and save it in local storage
  var JSONObject = localStorage.getItem("foodOrder"); //JSONObject is a string
  var JSObject = JSON.parse(JSONObject); //parse converts strings back to key-values

  JSObject["type"] = "Food";
  JSObject["method"] = method;
  JSObject["user"] = getCurrentUsername();
  // other info here

  //Store the order total with the order
  var ItemObject = JSObject["items"];
  // convert object to key's array
  const keys = Object.keys(ItemObject);
  var total = 0;
  for (var i = 0; i < keys.length; i++){
    var item = keys[i];
    // var quantity = JSObject[item].QTY;
    var quantity = ItemObject[item];
    var price = prices[item];
    var subtotal = price * quantity;
    total += subtotal;
  }
  JSObject["totalCost"] = total;
  
  // JSObject["ID"] = make id
  localStorage.setItem("currOrder", JSON.stringify(JSObject));
}

// Set the current order to a phone order
function putPhoneOrder(method) {
  var JSObject = {
    type: "Phone",
    method: method,
    user: getCurrentUsername(),
    totalCost: 2
  };
  localStorage.setItem("currOrder", JSON.stringify(JSObject));
}

// Push current order onto the previous order "stack"
function pushOrder() {
  var currOrderStr = localStorage.getItem("currOrder"); // Current order JSON String
  var currOrder = JSON.parse(currOrderStr); // Current order object

  // Set the current order to nothinf
  localStorage.removeItem("currOrder");
   
  // If the current order is a phone order the food order
  // Should not be effected 
  if(currOrder["type"] == "Food")
    localStorage.removeItem("foodOrder");
  
  var historyStr = localStorage.getItem("history"); // Previous orders JSON string
  if(historyStr !== null) {
    var history = JSON.parse(historyStr); // History object
    currOrder["previous"] = history; // Set history object to current order's previous value
  }

  // Save current order to history
  var newHistoryStr = JSON.stringify(currOrder);
  localStorage.setItem("history", newHistoryStr);
}

// Convert order to HTML code
// Only works on orders from putFoodOrder or putPhoneOrder
// (aka orders with "type" attributes)
function toHTML(order) {
  if(order === null || order == undefined || order["type"] == undefined)
    return "";

  var currentUsername = getCurrentUsername();
  if(order["user"] != currentUsername)
    return toHTML(order["previous"]);
  
  var str = "<br>";

  if(order["type"] == "Food") {
    // If order is a food order
    var itemList = order["items"];
    const keys = Object.keys(itemList);
  
    for (var i = 0; i < keys.length; i++) {
      var item = keys[i];
      var quantity = itemList[item];
      if(quantity > 0) {
        var itemName = item.replace(/\_/g, ' '); // replace underscore with space
        str += itemName + " x " + quantity + "<br>";
      }
    }
  } else {
    // If order is a phone order
    str += "Phone Call<br>";
  }

  var method = order["method"];
  var user = order["user"];
  var total = order["totalCost"];
  var previous = order["previous"];

  str += "<b>" + "Total Cost: " +  "$" + total + "</b>" + "<br>";
  str += "Paid ";
  if(user != "")
    str += " by " + user + " ";
  str += " via " + method + "<br>";
  if(previous != undefined)
    str += toHTML(previous);
  
  return str;
}



/*
  elem.innerHTML += "<br>";
  // convert object to key's array
  var itemList = order["items"];
  const keys = Object.keys(itemList);

  for (var i = 0; i < keys.length; i++) {
    var item = keys[i];
    var quantity = itemList[item];
    if(quantity > 0) {
      var itemName = item.replace(/\_/g, ' '); // replace underscore with space
      elem.innerHTML += itemName + " x " + quantity + "<br>";
    }
  }
  //Display the total cost with each order
  var total = order["totalCost"];
  elem.innerHTML += "<b>" + "Total Cost: " +  "$" + total + "</b>" + "<br>";
*/
//Clear local storage when the window is closed
// $(document).on("unload",function(){
//   localStorage.removeItem(orderNumber);
//   localStorage.removeItem(orders);
//   window.MyStorage.clear();
// });

