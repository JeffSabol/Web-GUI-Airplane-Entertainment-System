$(document).ready(function() {
    green(); red();
    $("#emergency-image").hide();
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
    $("h1").html("EMERGENCY DECLARED!");
    $(".prompt-button").hide(500);
    $("#emergency-image").show(500);
}
function no() {
    history.back();
}