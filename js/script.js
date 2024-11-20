// <Bianca>
$(document).ready(function () {
    // // Define the tree's crown boundary(approximately)
    let treeCrown = {
        width: 280,
        height: 190,
    };
    var offset = $('#tree').offset();
    console.dir(offset);

     var x = $("#tree").offset().left;
     var y = $("#tree").offset().top;
    // Randomly position applea inside the tree
    $(".apple").each(function () {
        let randomTop = y+90 + Math.random()*treeCrown.height;
        let randomLeft = x+70 + Math.random()*treeCrown.width;

        // Apply to apples
        $(this).css({
            position: "absolute",
            top: randomTop + "px",
            left: randomLeft + "px",
        });
    });
    // Define the basket's position
    let basketPosition = {
        top: 470,
        left: 300,
    };
    // put apples in the basket when clicked
    $(".apple").on("click", function () {
        $(this).css({
            position: "absolute",
            top: basketPosition.top + "px",
            left: basketPosition.left + "px",
        });
    })

});

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

$(function () {
    $('#sun_yellow').animate({ 'top': '96%', 'opacity': 0.6 }, 18000, function () {
        $('#stars').animate({ 'opacity': 1 }, 5000, function () {
            $('#moon').animate({ 'top': '20%', 'opacity': 1 }, 1500);
        });
    });
});
$('#clouds').animate({ 'backgroundPosition': '1000px 0px', 'opacity': 0 }, 30000);
var paths1 = ["../images/tree.png", "../images/tree_dark.png"];
var img1 = document.getElementById("tree");
var a = 0;
var timer1 = setInterval(function () {
    if (a >= paths1.length) {
        clearInterval(timer1);
        return;
    }
    img1.src = paths1[a++];
}, 9000);

var paths2 = ["../images/wateringcan.png", "../images/wateringcan_dark.png"];
var img2 = document.getElementById("wateringcan");
var b = 0;
var timer2 = setInterval(function () {
    if (b >= paths2.length) {
        clearInterval(timer2);
        return;
    }
    img2.src = paths2[b++];
}, 9000);

var paths3 = ["../images/basketfront.png", "../images/basketfront_dark.png"];
var img3 = document.getElementById("basketfront");
var c = 0;
var timer3 = setInterval(function () {
    if (c >= paths3.length) {
        clearInterval(timer3);
        return;
    }
    img3.src = paths3[c++];
}, 9000);

var paths4 = ["../images/basket.png", "../images/basket_dark.png"];
var img4 = document.getElementById("basket");
var d = 0;
var timer4 = setInterval(function () {
    if (d >= paths4.length) {
        clearInterval(timer4);
        return;
    }
    img4.src = paths4[d++];
}, 9000);

var paths5 = ["../images/apple.png", "../images/apple_dark.png"];
var img5 = document.getElementById("apple1");
var e = 0;
var timer5 = setInterval(function () {
    if (e >= paths5.length) {
        clearInterval(timer5);
        return;
    }
    img5.src = paths5[e++];
}, 9000);

var img6 = document.getElementById("apple2");
var f = 0;
var timer6 = setInterval(function () {
    if (f >= paths5.length) {
        clearInterval(timer6);
        return;
    }
    img6.src = paths5[f++];
}, 9000);

var img7 = document.getElementById("apple3");
var g = 0;
var timer7 = setInterval(function () {
    if (g >= paths5.length) {
        clearInterval(timer7);
        return;
    }
    img7.src = paths5[g++];
}, 9000);

// <Teo>
const grassContainer = document.getElementById("grass-container");
var paths8 = ["images/grass.png", "images/grass_dark.png"];
let h = 0;
for (let i = 0; i < 10; i++) {
    const img = document.createElement("img");
    img.src = paths8[0];
    img.alt = "grass";
    img.className = "grass";
    grassContainer.appendChild(img);
}

setTimeout(function () {
    document.querySelectorAll("#grass-container img").forEach((img) => {
        img.src = paths8[1];
    });
}, 18000);

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
}, 9000);

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
$(document).mousemove(function (e) {
    setDirection("#follow", e.pageX);
    $("#follow").offset({
        left: e.pageX,
        top: e.pageY
    });
});

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
