$(document).ready(function(){
  var elemHistory = document.getElementById("purchaseHistory");
  var historyStr = localStorage.getItem("history");
  if(historyStr === null)
    elemHistory.innerHTML = "No past purchases.<br>";
  else{
    elemHistory.innerHTML = "Here are all the purchases associated with " + getCurrentUsername() + ": <br><br>";
    elemHistory.innerHTML += toHTMLwButton(JSON.parse(historyStr));
    }
})

// Convert order to HTML code
// Only works on orders from putFoodOrder or putPhoneOrder
// (aka orders with "type" attributes)
function toHTMLwButton(order) {
  if(order === null || order == undefined || order["type"] == undefined)
    return "";

  var currentUsername = getCurrentUsername();
  if(order["user"] != currentUsername)
    return toHTMLwButton(order["previous"]);
  
  var str = "";

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
  var total = order["totalCost"];
  var previous = order["previous"];

  str += "<b>" + "Total Cost: " +  "$" + total + "</b>" + "<br>";
  str += "Paid via " + method + "<br>";
  str += "<button onclick='textReceipt2()' style='background-color: cyan'>SMS Receipt</button>";
  str += "<button onclick='emailReceipt2()' style='background-color: orange'>Email Receipt</button>";
  str += "<hr>";
  if(previous != undefined)
    str += toHTMLwButton(previous);
  
  return str;
}

function textReceipt2(){
  alert('A second copy of the receipt was sent to the phone number associated with your account!');
}

function emailReceipt2(){
  alert('A second copy of the receipt was sent to the e-mail address associated with your account!');
}
