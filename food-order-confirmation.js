$(document).ready(function () {
  var para = document.getElementById("foodOrderInfo");
  // this ready() is only for food-order-confirmation.html (which contains "foodOrderInfo")
  // this file can be loaded by other HTML pages which have their own ready() funcs
  // in another .js file
  if (para === null)
    return;
  var paraText = "";
  var total = 0;

  //Get the latest database information and save it in local storage
  var JSONObject = localStorage.getItem("foodOrder"); //JSONObject is a string
    if(JSONObject !== null) {var JSObject = JSON.parse(JSONObject); //parse converts strings back to key-values
    var ItemObject = JSObject["items"];

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
    paraText += "<b> " + "Total: $" + total + "</b>";
  }

  if (total == 0) {
    paraText = "<b>Cart is empty!</b><br>You need at least one food item for a successful purchase.";
    $("#Credit_Card").hide();
    $("#Loyalty_Points").hide();
  }

  para.innerHTML = paraText;
});