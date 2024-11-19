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

const grassContainer = document.getElementById("grass-container");
const grassImage = '<img src="images/grass.png" alt="grass" class="grass">';
for (let i = 0; i < 10; i++) {
    grassContainer.innerHTML += grassImage;
}

//changes the butterfly into a firefly after some time
var paths = ["../images/butterfly.png", "../images/firefly.png"];
var img = document.getElementById("butterfly");
var i = 0;
var timer = setInterval(function () {
    if (i >= paths.length) {
        clearInterval(timer);
        return;
    }
    img.src = paths[i++];
}, 10000);

//background color fades into darker one
$('#sky').animate({ 'backgroundColor': '#806776' }, 18000);
$('#night').animate({ 'opacity': 0.8 }, 20000);

$(document).ready(function () {
    function getRandomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let isFlipped = false;
    let mouse = "net";

    //getting the width and height of the butterfly so it doesnt go outside the screen
    const butterflyWidth = $("#butterfly").width();
    const butterflyHeight = $("#butterfly").height();

    //constants for the random movement
    const movementAmount = 100;
    const movementSpeed = 1000;
    let shouldMove = true;

    function generateNewPos() {
        //get current position of the butterfly
        const curPosX = $("#butterfly").offset().left;
        const curPosY = $("#butterfly").offset().top;

        let flipMultiplier = isFlipped ? 100 : 1;

        let newPosX = curPosX > 0 ? curPosX : Math.abs(curPosX);
        let newPosY = curPosY > 0 ? curPosY : Math.abs(curPosY);

        let movementX = getRandomIntFromRange(-movementAmount, movementAmount);
        let movementY =
            getRandomIntFromRange(-movementAmount, movementAmount) * flipMultiplier;

        //generate movement and check if its not leaving the screen
        while (true) {
            if (isInBounds(newPosX + movementX, newPosY + movementY)) {
                break;
            }
            movementX = getRandomIntFromRange(-movementAmount, movementAmount);
            movementY =
                getRandomIntFromRange(-movementAmount, movementAmount) * flipMultiplier;
        }
        newPosX += movementX;

        newPosY += movementY;
        return [newPosX, newPosY];
    }

    //check if a certain position is not outside the screen
    function isInBounds(posX, posY) {
        if (posX < 0 || posX > width) {
            return false;
        }

        if (posY < 0 || posY > height) {
            return false;
        }

        return true;
    }

    //function that moves the butterfly(general movement)
    function moveImg() {
        if (shouldMove) {
            let newPos = generateNewPos();

            $("#butterfly").animate(
                { left: newPos[0], top: newPos[1] },
                movementSpeed,
                function () {
                    moveImg();
                }
            );
        }
    }

    //quickly moves the butterfly to a random position on the screen
    function teleportImg() {
        shouldMove = false;
        let newPosX = getRandomIntFromRange(0, width);
        let newPosY = getRandomIntFromRange(0, height);
        $("#butterfly")
            .stop()
            .animate(
                {
                    left: newPosX,
                    top: newPosY,
                },
                100,
                function () {
                    shouldMove = true;
                    moveImg();
                }
            );
    }

    const width = Math.min(
        $(document).width() - butterflyWidth,
        1900 - butterflyWidth
    );
    const height = $(document).height() - butterflyHeight;

    moveImg();

    $("#butterfly")
        .mouseenter(function () {
            if (mouse === "net") teleportImg();
        })
        .mouseleave(function () {
            if (mouse === "net") moveImg();
        });
});

// <Jan>
// function flyAround(IdRef) {
//     var x = $(window).width() - $(IdRef).width();
//     var y = $(window).height() - $(IdRef).height();

//     var maxX = Math.floor(Math.random() * x);
//     var maxY = Math.floor(Math.random() * y);

//     setDirection(IdRef, maxX);

//     $(IdRef).animate({ top: maxY, left: maxX }, "slow", function () {
//         flyAround(IdRef);
//     });
// }

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

// function flyAway(IdRef) {
//     $(document).mousemove(function (e) {
//         var mouseX = e.pageX;
//         var mouseY = e.pageY;
//         var butterflyX = $(IdRef).offset().left + $(IdRef).width() / 2;
//         var butterflyY = $(IdRef).offset().top + $(IdRef).height() / 2;
//         var distance = Math.sqrt(Math.pow(mouseX - butterflyX, 2) + Math.pow(mouseY - butterflyY, 2));

//         if (distance < 100) { // If mouse is within 100px
//             var x = $(window).width() - $(IdRef).width();
//             var y = $(window).height() - $(IdRef).height();

//             var maxX = Math.floor(Math.random() * x);
//             var maxY = Math.floor(Math.random() * y);

//             setDirection(IdRef, maxX);

//             $(IdRef).stop().animate({ top: maxY, left: maxX }, "fast", function () { flyAround(IdRef) });
//         }
//     });
// }
// </Jan>

//Yelyzaveta
$(function(){
 $('#sun_yellow').animate({'top':'96%','opacity': 0.6}, 18000,function(){
    $('#stars').animate({'opacity':1},5000, function(){
        $('#moon').animate({'top':'20%','opacity':1},1500);
    });
 });
});
$('#clouds').animate({'backgroundPosition':'1000px 0px','opacity':0},30000);
// $('#tree').animate({'backgroundColor':'#2f3339'},30000);