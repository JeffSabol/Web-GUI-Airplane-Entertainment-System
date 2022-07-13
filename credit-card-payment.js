// $(document).ready(function(){
  // var elem = document.getElementById("orderSummary");
  // var ordNum = localStorage.getItem("orderNumber")

  // //Get the latest database information and save it in local storage
  // var JSONObject = localStorage.getItem("orders"); //JSONObject is a string
  // var JSObject = JSON.parse(JSONObject); //parse converts strings back to key-values
  
  // elem.innerHTML = JSObject[ordNum].DESC;
//   updateOrderView();
// });

/*
function updateOrderView() {
  var orderJSON = localStorage.getItem("foodOrder");
  var order = JSON.parse(orderJSON);

  var elemSummary = document.getElementById("orderSummary");
  var elemHistory = document.getElementById("orderHistory");
  
  elemSummary.innerHTML = "";
  elemHistory.innerHTML = "";

  if(order["items"] != undefined)
    displayOrder(elemSummary, order);
  updateOrderHistory(elemHistory, order["previous"]);
}

function updateOrderHistory(elem, order) {
  if(order == undefined)
    return;
  displayOrder(elem, order);
  updateOrderHistory(elem, order["previous"]);
}
*/

$(document).ready(refresh);

function purchase() {

  //Check to make sure there is valid data in the input boxes
  var ccNumBox = document.getElementById("cardNumber");
  var ccHolderBox = document.getElementById("cardHolderName");
  var ccExpBox = document.getElementById("expiration");
  var errorMsg = document.getElementById("CCError");
  errorMsg.innerHTML = "<br>";
  var success = true; //if any error message must be displayed, change this flag to false
  
  //Error Messages for the card number
  if(ccNumBox.value == ""){
    errorMsg.innerHTML += "Please enter the credit card number!" + "<br>";
    success = false; 
  }
  else if(ccNumBox.value.length != 16){
    errorMsg.innerHTML += "Credit cards must be 16 digits!" + "<br>";
    success = false; 
  }
  else if(isNaN(ccNumBox.value) == true){
    errorMsg.innerHTML += "Credit card number must be comprised solely of numeric digits!" + "<br>";
    success = false; 
  }

  //Error Messages for the card holder name
  if(ccHolderBox.value == ""){
    errorMsg.innerHTML += "Please enter the card holder's name!" + "<br>";
    success = false; 
  }
  
  //Error Messages for the card expiration date
  if(ccExpBox.value == ""){
    errorMsg.innerHTML += "Please enter the credit card's expiration date!" + "<br>";
    success = false; 
  }
  else if(ccExpBox.value.length != 5){
    errorMsg.innerHTML += "Expiration dates must be in the form: MM/YY" + "<br>";
    success = false; 
  }
  else if(isNaN(ccExpBox.value[0]) || isNaN(ccExpBox.value[1]) || ccExpBox.value[2] != "/"
          || isNaN(ccExpBox.value[3]) || isNaN(ccExpBox.value[4]) ){
    errorMsg.innerHTML += "Expiration date input is invalid. Expiration dates must be in the form: MM/YY" + "<br>";
    success = false; 
  }
  
  var orderJSON = localStorage.getItem("currOrder");
  var order = JSON.parse(orderJSON);
  
  if(order["method"] == undefined) {
    alert("Please visit the food menu to create an order");
  }



    
  //Only pushOrder() and updateOrderView() if there were no error messages above
  else if (success){
    pushOrder();
    // updateOrderView();
    refresh();

    errorMsg.style.color = 'green';
    errorMsg.innerHTML = "<br>";
    errorMsg.innerHTML += "Payment complete! Please choose your receipt method.";
    
    //Upon successful order, hide the purchase/return buttons and display the receipt buttons

    $("#purchaseButtons").hide(100);
    $("#receiptButtons").show(100);
    
    //buttons1.hide(100);
    //buttons2.show(100);
    
    
  }
}

function redirect(){
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

function emailReceipt(){
  var emailBox = document.getElementById("email");
  var email = emailBox.value;
  if(email == "")
  {
    alert("Please enter an email address!");
  }
  else{
    alert("An email was sent to " + email);
    redirect();
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
    redirect();
  }
}

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