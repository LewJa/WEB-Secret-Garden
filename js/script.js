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
    $("#follow").offset({
        left: e.pageX,
        top: e.pageY
    });
});

function flyaround(IdRef) {
    var x = $(window).width() - $(IdRef).width();
    var y = $(window).height() - $(IdRef).height();

    var maxX = Math.floor(Math.random() * x);
    var maxY = Math.floor(Math.random() * y);
    $(IdRef).animate({top: maxY, left: maxX}, "slow", function() {
        flyaround(IdRef)}
    );
}

function direction(IdRef) {
    //in this place soon will be the code for the direction of the butterfly (and the net possibly)
}
    

$(document).ready(function() {
    $("#butterfly").animate({left: "+=200"},"slow",function() {flyaround(this)});
});
/*
$("#butterfly").mouseover(function () {
    var x = $(window).width() - $("#butterfly").width();
    var y = $(window).height() - $("#butterfly").height();

    var maxX = Math.floor(Math.random() * x);
    var maxY = Math.floor(Math.random() * y);
   
    $(this).animate({left: maxX, top: maxY}, "slow");
});
*/
