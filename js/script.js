//MAKE THE MAGIC HAPPEN
$("#wateringcan").on("click", function () {
    $(this).toggleClass("tilted");
});

let waterDropInterval;
$("#wateringcan").on("click", function () {
    if ($(this).hasClass("tilted")) {
        waterDropInterval = setInterval(createWaterDrop, 700);
    } else {
        clearInterval(waterDropInterval);
    }
});

function createWaterDrop() {
    let $waterDrop = $("<div class='waterdrop'><img src='images/waterdrop.png' alt='water drop'></div>");
    $("body").append($waterDrop);
    $waterDrop.find("img").css({
        width: "20px",
        height: "40px"
    });
    $waterDrop.css({
        position: 'absolute',
        left: $("#wateringcan").position().left + 10,
        top: $("#wateringcan").position().top + 90

    });
    $waterDrop.animate({
        top: $(window).height()
    }, 2000, function () {
        $(this).remove();
    });
}

$(document).mousemove(function (e) {
    setDirection("#follow", e.pageX); // Flips the net - Jan
    $("#follow").offset({
        left: e.pageX,
        top: e.pageY
    });
});

// <Jan>

$(document).ready(function() {
    flyAround("#butterfly");
    flyAway("#butterfly");
});

function flyAround(IdRef) {
    var x = $(window).width() - $(IdRef).width();
    var y = $(window).height() - $(IdRef).height();

    var maxX = Math.floor(Math.random() * x);
    var maxY = Math.floor(Math.random() * y);

    setDirection(IdRef, maxX);

    $(IdRef).animate({top: maxY, left: maxX}, "slow", function() {
        flyAround(IdRef);
    });
}

function setDirection(IdRef, newX) {
    var currentX = $(IdRef).offset().left;
    if (newX > currentX) { //facing right
        if (IdRef === "#follow") { 
            $("#net").css("transform", "scaleX(-1) translate(70%, -20%)");
        } else {
            $(IdRef).css("transform", "scaleX(-1)");
        }
    } else { //face left
        if (IdRef === "#follow") {
            $("#net").css("transform", "scaleX(1) translate(-20%, -20%)");
        } else {
            $(IdRef).css("transform", "scaleX(1)");
        }
    }
}

function flyAway(IdRef) {
    $(document).mousemove(function(e) {
        var mouseX = e.pageX;
        var mouseY = e.pageY;
        var butterflyX = $(IdRef).offset().left + $(IdRef).width() / 2;
        var butterflyY = $(IdRef).offset().top + $(IdRef).height() / 2;
        var distance = Math.sqrt(Math.pow(mouseX - butterflyX, 2) + Math.pow(mouseY - butterflyY, 2));

        if (distance < 100) { // If mouse is within 100px
            var x = $(window).width() - $(IdRef).width();
            var y = $(window).height() - $(IdRef).height();

            var maxX = Math.floor(Math.random() * x);
            var maxY = Math.floor(Math.random() * y);

            setDirection(IdRef, maxX);

            $(IdRef).stop().animate({top: maxY, left: maxX}, "fast", function() {flyAround(IdRef)});
        }
    });
}

// </Jan>