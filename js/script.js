//MAKE THE MAGIC HAPPEN
$("#wateringcan").on("click", function() {
    $(this).toggleClass("tilted");
});

let waterDropInterval;
$("#wateringcan").on("click", function(){
    if($(this).hasClass("tilted")){
        waterDropInterval = setInterval( createWaterDrop, 700);
    }else{
        clearInterval(waterDropInterval);
    }
});

function createWaterDrop(){
    let $waterDrop = $("<div class='waterdrop'><img src='images/waterdrop.png' alt='water drop'></div>");
    $("body").append($waterDrop);
    $waterDrop.find("img").css({
        width: "20px",  
        height: "40px"  
    });
    $waterDrop.css({
        position: 'absolute',
        left: $("#wateringcan").position().left +10,
        top: $("#wateringcan").position().top  +90
        
    });
    $waterDrop.animate({
        top: $(window).height()
    }, 2000 , function(){
         $(this).remove();
    });
}

 $(document).mousemove(function(e) {
     $("#follow").offset({
         left: e.pageX,
         top: e.pageY
     });
 });
