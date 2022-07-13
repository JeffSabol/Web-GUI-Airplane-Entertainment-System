$(document).ready(function () {
    $(".b1").on("click", {src: "https://iili.io/jlg1kP.md.png"}, loadMovie);
    $(".b2").on("click", {src: "https://iili.io/jlUW0l.md.png"}, loadMovie);
    $(".b3").on("click", {src: "https://iili.io/jlUIWJ.md.png"}, loadMovie);
    $(".b4").on("click", {src: "https://iili.io/jlgO2p.md.png"}, loadMovie);
    $(".b5").on("click", {src: "https://iili.io/jlgSTX.md.png"}, loadMovie);
    $(".b6").on("click", {src: "https://iili.io/jlgUjn.md.png"}, loadMovie);
});

function loadMovie(event) { 
    $(".main-menu").html(
        '<button class="exit-button" onclick="open_menu()">X</button>\
        <div class="row">\
            <div class="col-sm-12"></div>\
        </div>'
    );
    $(".col-sm-12").html('<img class="movie" src="' + event.data.src + '">');
}

function open_menu() {
    window.location = "movie-menu.html";
}