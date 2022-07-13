$(document).ready(function () {
    $(".b1").on("click", {src: "https://iili.io/jqcDmb.png"}, loadGame);
    $(".b2").on("click", {src: "https://iili.io/jqlBTJ.md.jpg"}, loadGame);
    $(".b3").on("click", {src: "https://iili.io/jqlu2t.md.jpg"}, loadGame);
    $(".b4").on("click", {src: "https://iili.io/jqlRvn.jpg"}, loadGame);
    $(".b5").on("click", {src: "https://iili.io/jqlYTG.md.jpg"}, loadGame);
    $(".b6").on("click", {src: "https://iili.io/jqlcQ4.md.jpg"}, loadGame);
});

function loadGame(event) {
    $(".main-menu").html(
        '<button class="exit-button" onclick="open_menu()">X</button>\
        <div class="row">\
            <div class="col-sm-12"></div>\
        </div>'
    );
    $(".col-sm-12").html('<img class="game" src="' + event.data.src + '">');
}

function open_menu() {
    window.location = "game-menu.html";
}