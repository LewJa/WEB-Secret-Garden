// <Yelyzaveta>
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


// <Teo>
$(document).mousemove(function (e) {
    setDirection("#follow", e.pageX); // Flips the net - Jan
    $("#follow").offset({
        left: e.pageX,
        top: e.pageY
    });
});

// $(document).ready(function () {
//     $('#dayButtonId').click(function () {
//         $('body').css({
//             'background-color': '#baddeb'
//         });
//     });

//     $('#nightButtonId').click(function () {
//         $('body').css({
//             'background-color': '#364044'
//         });
//     });
// });

const grassContainer = document.getElementById("grass-container");
const grassImage = '<img src="images/grass.png" alt="grass" class="grass">';
for (let i = 0; i < 10; i++) {
    grassContainer.innerHTML += grassImage;
}
/*
$('#sky').animate({'backgroundColor':'#806776'}, 18000);
$('#night').animate({'opacity':0.8}, 20000);

$(document).ready(function() {
    $('#butterfly').delay(5000).fadeOut(1500);
    $('#firefly').fadeOut(10).delay(5000).fadeIn(1500);
});

$(document).ready(function () {
    flyAround("#firefly");
    flyAway("#firefly");
});*/

// <Jan>

$(document).ready(function () {
    flyAround("#butterfly");
    flyAway("#butterfly");
    dayNightCycle();
});

function flyAround(IdRef) {
    var x = $(window).width() - $(IdRef).width() - $("#butterfly").width()/2;
    var y = $(window).height() - $(IdRef).height() - $("#butterfly").height()/2;

    var maxX = Math.floor(Math.random() * x);
    var maxY = Math.floor(Math.random() * y);

    setDirection(IdRef, maxX);

    $(IdRef).animate({ top: maxY, left: maxX }, "slow", function () {
        flyAround(IdRef);
    });

    if (IdRef === "#butterfly" && $('#firefly-glow').is(':visible')) {
        positionGlow(maxX, maxY);
    }
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
    $(document).mousemove(function (e) {
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

            $(IdRef).stop().animate({ top: maxY, left: maxX }, "fast", function () { flyAround(IdRef) });
        }
    });
}

function dayNightCycle() {
    var isDay = true;
    $('#butterfly').attr('src', 'images/butterfly.png');
    function switchCycle() {
        if (isDay) {
            $('#sky').animate({ 'backgroundColor': '#806776' }, 18000);
            $('#night').animate({ 'opacity': 1 }, 20000, function() {
                isDay = false;
                switchCycle();
            });
            setTimeout(function() {
                $('#butterfly').attr('src', 'images/firefly.png');
                $('#firefly-glow').show();
                positionGlow();
            }, 15000);} 
            else {
            $('#sky').animate({ 'backgroundColor': '#baddeb' }, 18000);
            $('#night').animate({ 'opacity': 0 }, 20000, function() {
                isDay = true;
                switchCycle();
            });
            setTimeout(function() {
                $('#butterfly').attr('src', 'images/butterfly.png');
                $('#firefly-glow').hide();
            }, 15000);
        }
    }
    switchCycle();
}

function positionGlow(maxX, maxY) {
    var glow = $('#firefly-glow');
    glow.animate({
        top: maxY,
        left: maxX
    } , "slow");
}

// </Jan>