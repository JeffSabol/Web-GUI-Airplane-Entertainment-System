// $(document).ready(function(){
  // var elem = document.getElementById("orderSummary");
  // var ordNum = localStorage.getItem("orderNumber")

  // //Get the latest database information and save it in local storage
  // var JSONObject = localStorage.getItem("orders"); //JSONObject is a string
  // var JSObject = JSON.parse(JSONObject); //parse converts strings back to key-values
  
  // elem.innerHTML = JSObject[ordNum].DESC;
//   updateOrderView();
// });


$(document).ready(refresh);

function purchase() {
  var orderJSON = localStorage.getItem("currOrder");
  var order = JSON.parse(orderJSON);

  var accountJSON = localStorage.getItem("User");
  if(accountJSON === null) {
    alert("Must be logged in to use loyalty points");
    window.location = "login.html";
  }
  var account = JSON.parse(accountJSON);

  //NOT ENOUGH POINTS
  var total = order["totalCost"];
  var bal = account["loyaltyPoints"];
  if(bal<total){
    alert("ERROR: Not enough loyalty points! Please select 'RETURN' to switch payment methods.");
    return;
    }
  else if(order["method"] == undefined) {
    alert("Please visit the food menu to create an order");
  } 
  //Only pushOrder() and updateOrderView() if there were no error messages above
  else {
    bal -= order["totalCost"];
    account["loyaltyPoints"] = bal;
    accountJSON = JSON.stringify(account);
    localStorage.setItem("User", accountJSON);
    
    $("h1").html("Payment success!");
    $("#LP").html("Updated loyalty points balance: $" + bal);
    pushOrder();
    // updateOrderView();
    refresh();
    $("#purchaseButtons").hide(100);
    $("#receiptButtons").show(100);
    
  }
}
function emailReceipt(){
  var emailBox = document.getElementById("email");
  var email = emailBox.value;
  if(email == "")
  {
    alert("Please enter an email address!");
  }
  else{
    alert("An email was sent to " + email);
    redirectLP();
  }
}

function textReceipt(){
  var textBox = document.getElementById("SMS");
  var text = textBox.value;
  if(text == "")
  {
    alert("Please enter a phone number");
  }
  else if(text.length<10){
      alert("Not enough digits for a valid phone number!");
    }
  else{
    alert("An SMS was sent to " + text);
    redirectLP();
  }
}

function redirectLP(){
  //Get the history object from local storage. 1st item should be the order that was just completed. 
  var orderJSON = localStorage.getItem("history");
  var order = JSON.parse(orderJSON); 
  //If paying for phone service, go to phone.html
  if(order["type"] == "Phone") {
    //window.location.replace("https://cmsc437-flight-gui.johnspann.repl.co/phone.html");
    window.location.href = "phone.html";
  }
  //Otherwise, food is already paid for. Send the user to the main menu
  else{
    //history.back();
    window.location.href = "index.html";
  }
}

// function updateOrderView() {
//   var orderJSON = localStorage.getItem("foodOrder");
//   var order = JSON.parse(orderJSON);

//   var elemSummary = document.getElementById("orderSummary");
//   var elemHistory = document.getElementById("orderHistory");
  
//   elemSummary.innerHTML = "";
//   elemHistory.innerHTML = "";

//   if(order["items"] != undefined)
//     displayOrder(elemSummary, order);
//   updateOrderHistory(elemHistory, order["previous"]);
// }

// function updateOrderHistory(elem, order) {
//   if(order == undefined)
//     return;
//   displayOrder(elem, order);
//   updateOrderHistory(elem, order["previous"]);
// }

// function displayOrder(elem, order) {
//   elem.innerHTML += "<br>";
//   // convert object to key's array
//   var itemList = order["items"];
//   const keys = Object.keys(itemList);

//   for (var i = 0; i < keys.length; i++) {
//     var item = keys[i];
//     var quantity = itemList[item];
//     if(quantity > 0) {
//       var itemName = item.replace(/\_/g, ' '); // replace underscore with space
//       elem.innerHTML += itemName + " x " + quantity + "<br>";
//     }
//   }
//   //Display the total cost with each order
//   var total = order["totalCost"];
//   elem.innerHTML += "<b>" + "Total Cost: " +  "$" + total + "</b>" + "<br>";
// }

/*
// convert object to key's array
  const keys = Object.keys(ItemObject);

  for (var i = 0; i < keys.length; i++) {
    var item = keys[i];
    // var quantity = JSObject[item].QTY;
    var quantity = ItemObject[item];
    var price = prices[item];
    var subtotal = price * quantity;
    total += subtotal;
    if (quantity > 0) {
      var itemName = item.replace(/\_/g, ' '); // replace underscore with space
      paraText = paraText + itemName + " x " + quantity + " = $" + subtotal + "<br>";
    }
  }
*/