/*Fuction for incrementing in the food menu*/

function incrementValue(id){
  var value = parseInt(document.getElementById(id).value, 10);
  value = isNaN(value) ? 0: value;
  value++;
  document.getElementById(id).value = value;
}

function decrementValue(id){
  var value = parseInt(document.getElementById(id).value, 10);
  value = isNaN(value) ? 0: value;
  value--;
  if(value<0)
  {
    value=0;
  }
  document.getElementById(id).value = value;
}
