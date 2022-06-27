$(document).ready(function() {
  load("milk");
  load("water");
  load("wc");
  load("bud");
});

$(window).on("unload", function() {
  save("milk");
  save("water");
  save("wc");
  save("bud");
});

function save(foodItem) {
  var id = "#" + foodItem;
  var amount = $(id).val();
  localStorage.setItem(foodItem, amount);
}

function load(foodItem) {
  var id = "#" + foodItem;
  var amount = localStorage.getItem(foodItem);
  if(amount == null)
    amount = 0;
  $(id).val(amount);
}

/*
Function to calculate the total for the order and pass the it to the confirmation screen, where the 
user can select the payment method. 
*/
function checkout(){
  
}