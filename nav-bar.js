// Navigation bar HTML
// Newlines must be followed by backslashes

var htmlString = '\
\
<!--Main menu navbar-->\
<nav class="navbar navbar-expand-sm navbar-light center">\
<!--a class="navbar-brand" href="#">Main Menu</a-->\
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">\
<span class="navbar-toggler-icon"></span> </button>\
<div class="collapse navbar-collapse navbar-inner" id="collapsibleNavbar">\
  <ul class="nav navbar-nav">\
    <li class="nav-item">\
      <a class="nav-link" href="declare-emergency.html">\
        Emergency <br>\
        <img src="https://iili.io/hDyG7j.md.png" alt="emergency image" width="50" height="50">\
      </a>\
    </li>\
    <li class="nav-item">\
      <a class="nav-link" href="call-attendant.html">\
        Flight Attendant <br>\
        <img src="https://iili.io/hDm9Q1.th.png" alt="flight attendant image" width="50" height="50">\
      </a>\
    </li>\
    <li class="nav-item">\
      <a class="nav-link" href="phone.html">\
        Phone Call <br>\
        <img src="https://iili.io/hDm5v4.th.png" alt="phone image" width="50" height="50">\
      </a>\
    </li>\
    <li class="nav-item">\
      <a class="nav-link" href="index.html">\
        Main Menu <br>\
        <img src="https://iili.io/hDmstI.th.png" alt="home image" width="60" height="60">\
      </a>\
    </li>\
  </ul>\
</div>\
</nav>\
';

$(document).ready(function() {
  document.getElementById("nav-bar").innerHTML = htmlString;
  $(".exit-button").html("X");
  $(".exit-button").click(function() {
    history.back();
  });
});