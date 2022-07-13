function appendDigit(id){
  //Get the text from the textbox
  var numberString = document.getElementById("numberBox").value;
  
  //Get the next digit from the button click and append to the string
  numberString += id;
  
  //Store the new string back in the text box
  document.getElementById("numberBox").value = numberString;
}

function deleteDigit(){
  //Get the text from the textbox
  var numberString = document.getElementById("numberBox").value;
  if(numberString.length > 0){
    var newString = numberString.slice(0,-1);
    //Store the new string back in the text box
    document.getElementById("numberBox").value = newString;
  }
}

function clearNumber(){
  var numberString = document.getElementById("numberBox");
  numberString.value = "";
}

function makeCall(){
  $("#callArea").hide(500);
  $("#currentlyInCall").show(500);

  var numberString = document.getElementById("numberBox").value;
  document.getElementById("callingText").innerHTML = "Calling " + numberString + "...";
}

function endCall(){
  
}

function addPhoneOrder(method){
  //Get the latest database information and save it in local storage
  var JSONObject = localStorage.getItem("foodOrder"); //JSONObject is a string
  var JSObject = JSON.parse(JSONObject); //parse converts strings back to key-values

  JSObject["method"] = method;
  // other info here

  JSObject["totalCost"] = 2.00;
  
  // JSObject["ID"] = make id
  localStorage.setItem("foodOrder", JSON.stringify(JSObject));
}