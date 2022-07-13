// var foodOrder = {}; //global variable to store the foodOrder

var order;

$(document).ready(function() {
  var JSONObject = localStorage.getItem("foodOrder"); //JSONObject is a string
  order = JSONObject === null ? {} : JSON.parse(JSONObject); //parse converts strings back to key-values
  if(order["items"] == undefined)
    order["items"] = {};
  
  //For each input box on the page
  $(':input[type="number"]').each(function(){
    var item = this.id;
    var quantity = order["items"][item];
    //If the item is stored in the database, retrieve the quantity
    if(quantity == undefined) {
      order["items"][item] = 0;
      quantity = 0;
    }
    this.value = quantity;
  });

  $(':input[type="number"]').on("change, keyup, mouseup", calcTotal);

  calcTotal();
});

/*Fuction for incrementing in the food menu*/
function incrementValue(id){
  var item = "#" + id;
  var quantity = parseInt($(item).val());

  $(item).val(quantity + 1);
  calcTotal();
}

function decrementValue(id){
  var item = "#" + id;
  var quantity = parseInt($(item).val());

  // if(quantity == 0)
  //   return;
  $(item).val(quantity - 1);
  calcTotal();
}

function clearOrder(){
  // For each input item
  $(':input[type="number"]').each(function(){
    var item = this.id;
    //Update the value on the GUI
    this.value = 0;
    //Update the value in the database
    order["items"][item] = this.value;
  });

  //Write the database back into storage
  calcTotal();

  //change the displayed total to 0
  var td = document.getElementById("totalDisplay");
  td.innerHTML = "$" + 0;
}

function calcTotal() {
  var total = 0;
  $(':input[type="number"]').each(function() {
    if(this.value < 0)
      this.value = 0;
    
    var item = this.id;
    var quantity = this.value;
    order["items"][item] = quantity;

    var price = prices[item];
    var subtotal = quantity*price;
    total += subtotal;
  });
  // save to database
  var JSONObject = JSON.stringify(order);
  localStorage.setItem("foodOrder", JSONObject);
  // total display
  $("#totalDisplay").html("$" + total);
}
