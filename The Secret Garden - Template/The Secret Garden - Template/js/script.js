//MAKE THE MAGIC HAPPEN
$("#wateringcan").on("click", function() {
    $(this).toggleClass("tilted");
});

let waterDropInterval;
$("#wateringcan").on("click", function(){
    if($(this).hasClass("tilted")){
        waterDropInterval = setInterval(createWaterDrop, 500);
    }else{
        clearInterval(waterDropInterval);
    }
});

function createWaterDrop(){
    let $waterDrop = $("<div class='waterdrop'></div>");
    $(window).addend($waterDrop);
    $waterDrop.css({
        left: $("#wateringcan").position().left +10,
        top: $("#wateringcan").position().top +20
    });
    $waterDrop.animate({
        top: $(window).height()
    }, 2000, function(){
         $(this).remove();
    });
}