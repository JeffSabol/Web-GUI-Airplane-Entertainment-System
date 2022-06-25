$(document).ready(function() {
    green(); red();
    $(".prompt-button").mouseenter(function() {
        $(this).css("background-color", "blue");
    });
    $(".yes").mouseleave(green);
    $(".no").mouseleave(red);
});
function green() {
    $(".yes").css("background-color", "rgb(6, 223, 21)");
}
function red() {
    $(".no").css("background-color", "red");
}
function yes() {
    $("h1").html("Calling Flight Attendant...");
    $(".prompt-button").hide(500);
}
function no() {
    history.back();
}