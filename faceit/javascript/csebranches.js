var currentId, activeId = "l1";
eventImages = Array("clang.png", "java.png", "lanparty.png");

$(document).ready(function() {

  $("#l1").children('span').fadeOut('fast', function() {

    $("#l1").animate({
      marginTop: "+=100px", height: "+=400"},
      300, "easeOutCubic", function() {
        $(this).animate({
          width: '+=960px'},
          300, "easeOutCubic", function() {
            console.log("FIRRRSST");
            $("l1").children('button').fadeIn('fast', function() {
              console.log("faded in");
            });
            $("#l1").children('button').fadeIn('fast', function() {
              console.log("faded in");
            });
            $(this).children('span').fadeIn('400', function() {

            });
        });
    });


  });

  // $("#l1").animate({
  //   marginTop: "+=100px", height: "+=400"},
  //   300, "easeOutCubic", function() {
  //     $(this).animate({
  //       width: '+=960px'},
  //       300, "easeOutCubic", function() {
  //         console.log("FIRRRSST");
  //         $("l1").children('button').fadeIn('fast', function() {
  //           console.log("faded in");
  //         });
  //         $("#l1").children('button').fadeIn('fast', function() {
  //           console.log("faded in");
  //         });
  //         $(this).children('span').fadeIn('400', function() {
  //
  //         });
  //     });
  // });




  $('.events').click(eventClicked);

});


function eventClicked() {
  currentId = $(this).attr('id');
  console.log(currentId);
  console.log(activeId);
  if (activeId != currentId) {
    $('.events').unbind('click', eventClicked);
    revert(activeId, currentId);
    activeId = currentId;
    console.log("Second " + activeId + currentId);
  }

}

function revert(revertId, currentId) {
  var factor = parseInt(revertId[1]);
  var toLeft = "+=" + (160 * (factor-1)).toString() + "px";
  var imageUrl = eventImages[factor-1];
  console.log(imageUrl);
  console.log(factor);

  reversing(revertId);

  $("#" + revertId).children('span').fadeOut('fast', function() {
    $("#" + revertId).animate({
      width: '-=960px',
      marginLeft: toLeft},
      200, function() {
        $(this).animate({
          marginTop: '-=100px', height: '-=400px'},
          400, "easeOutCubic", function() {

            $(this).children('span').fadeIn('fast', function() {

            });
            expand(currentId);
            // $(this).css({
            //   'background-image': 'url("images/' + imageUrl + '")'
            // });
        });
    });


  });



}

function expand(expandId) {

  var factor = parseInt(expandId[1]);
  var toLeft = "-=" + (160 * (factor-1)).toString() + "px";

  $("#" + expandId).css({
    'background-image': 'none'
  });

  $("#" + expandId).children('span').fadeOut('fast', function() {
    $("#" + expandId).animate({
      marginTop: "+=100px", height: "+=400"},
      300, "easeOutCubic", function() {
        $("#" + currentId).children('span').css({
          //'margin-top': '20px'
        });
        $(this).animate({
          marginLeft: toLeft,
          width: '+=960px'},
          400, "easeOutCubic", function() {
            $('.events').bind('click', eventClicked);
            $("#" + expandId).children('span').fadeIn('slow', function() {
            });
            expanded(expandId);
        });
    });

  });

  // $("#" + expandId).animate({
  //   marginTop: "+=100px", height: "+=400"},
  //   300, "easeOutCubic", function() {
  //     $(this).animate({
  //       marginLeft: toLeft,
  //       width: '+=960px'},
  //       400, "easeOutCubic", function() {
  //         $('.events').bind('click', eventClicked);
  //         $("#" + expandId).children('span').fadeIn('slow', function() {
  //
  //         });
  //     });
  // });
}

function reversing(revertId) {
  $("#" + revertId).children('button').fadeOut('fast', function() {

  });
}

function expanded(expandId) {
  $("#" + expandId).children('button').fadeIn('fast', function() {

  });
}
