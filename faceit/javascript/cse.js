/*
TODO: Second opening animation takes way too much time. Find a fix ASAP.
*/

var currentId, activeId = "l1";
var yearActive = false;
var poppedup = false;
eventImages = Array("clang.png", "java.png", "lanparty.png");
topMargins = Array(6, 5, 30, 10, 12, 5, 12, 12);
//console.log(navigator.userAgent);
if (navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1) {
  console.log("Fire-fucking-fox? Seriously? You couldn't get a better browser? Get Chrome. Get a life.");
  topMargins = Array(6, 5, 27, 20, 8, 5, 12, 12);
}
// else if (navigator.userAgent.indexOf("Chrome") > -1) {
//   topMargins = Array(6, 5, 30, 10, 12, 5, 12, 12);
// }
switches = Array("#switch1", "#switch2", "#switch3", "#switch4", "#switch5", "#switch6", "#switch7", "#switch8");

$(document).ready(function() {

  $("#l1").children('span').fadeOut('fast', function() {

    $("#l1").animate({
      marginTop: "+=100px", height: "+=400"},
      300, "easeOutCubic", function() {
        $(this).animate({
          width: '+=1120px'},
          300, "easeOutCubic", function() {
            //console.log("FIRRRSST");
            $("#l1").children('.eventname').css({ 'margin-top': 10 });
            $("#l1").children('.bottompanel').fadeIn('fast', function() {
              //console.log("faded in");
            });
            $(this).children('span').fadeIn('400');
        });
    });

    $(".switch").change(function(event) {
      if ($(this).is(":checked")) {
        $(this).parent().children('.mark').html("This event has been marked");
      }
      else {
        $(this).parent().children('.mark').html("Mark this event for registration");
      }
    });
  });

  $(".register").click(function(event) {
    //$(this).parent().children('.marker').children('.switch').prop('checked', true);
    var $div = $('<div/>'),
       btnOffset = $(this).offset(),
       xPos = event.pageX - btnOffset.left,
       yPos = event.pageY - btnOffset.top;
       $div.addClass('ripple');
    var $ripple = $(".ripple");

    $ripple.css("height", $(this).height());
    $ripple.css("width", $(this).height());
    $div.css({
        top: yPos - ($ripple.height()/2),
        left: xPos - ($ripple.width()/2),
      })
      .appendTo($(this));

    window.setTimeout(function(){
      $div.remove();
      //popitup();
    }, 500);

  });


  $(".registerbutton").click(popitup);
  $("#submitbutton").click(popitdown);

  for(aswitch in switches) {
    if ($(switches[aswitch]).is(":checked")) {
        $(switches[aswitch]).parent().children(".forff").css({'left':'30px'});
        $(switches[aswitch]).parent().children('.mark').html("This event has been marked");
        //console.log(switches[aswitch] + " is on");
    }
    else {
      $(switches[aswitch]).parent().children(".forff").css({'left':'-5px'});
      //console.log(switches[aswitch] + " is off");
    }
  }

  $('.forff').click(marked);

  $('.events').click(eventClicked);

  $("#year").click(showYear);

  $('#rollno').click(function(event) { hideYear(); });
  $('#phno').click(function(event) { hideYear(); });
  $('#name').click(function(event) { hideYear(); });
  $('#college').click(function(event) { hideYear(); });
  $('#email').click(function(event) { hideYear(); });

  $(".whichyear").click(function(event) {
    hideYear();
    $("#year").children('span').html($(this).attr("value"));
  });

});

function popitup() {
  //$(".popup").show();
  if (!poppedup) {
    $(".popup").fadeIn().animate({
      height: 600,
      width: 800,
      marginTop:-10,
      marginLeft:235,
      borderRadius: 0},
      'slow', "easeInOutQuint", function() {
        $(this).children().fadeIn('fast');
        poppedup = true;
    });
  }
}

function popitdown() {
  if (poppedup) {
    $(".popup").children().fadeOut('fast', function() {
      $('.popup').animate({
        height: 100,
        width: 100,
        marginTop:300,
        marginLeft:600,
        borderRadius: 50},
        'slow', "easeInOutQuint", function() {

      });
      $('.popup').fadeOut('fast');
      poppedup = false;

    });
  }
}

function showYear() {
  if (!yearActive) {
    $(".yearlist").show().animate({
      height: "200px"},
      300);
    $(".whichyear").fadeIn('fast', function(){yearActive = true;});
  }
}

function hideYear() {
  if (yearActive) {
    $(".yearlist").fadeOut(200, function() {
      $('.yearlist').animate({
        height: "50px"},
        300);
      $(".whichyear").hide();
      yearActive = false;
    });
  }
}

function eventClicked() {
  currentId = $(this).attr('id');
  // console.log(currentId);
  // console.log(activeId);
  if (activeId != currentId) {
    $('.events').unbind('click', eventClicked);
    revert(activeId, currentId);
    activeId = currentId;
    //console.log("Second " + activeId + currentId);
  }

}

function revert(revertId, currentId) {
  var factor = parseInt(revertId[1]);
  var toLeft = "+=" + (160 * (factor-1)).toString() + "px";
  var imageUrl = eventImages[factor-1];
  // console.log(imageUrl);
  // console.log(factor);

  reversing(revertId);

  $("#" + revertId).children('span').fadeOut('fast', function() {
    $("#" + revertId).animate({
      width: '-=1120px',
      marginLeft: toLeft},
      200, function() {
        $(this).animate({
          marginTop: '-=100px', height: '-=400px'},
          400, "easeOutCubic", function() {
            expand(currentId);
            $("#" + revertId).children('.eventname').css({ 'margin-top': topMargins[factor-1] });
            $(this).children('span').fadeIn('fast');
        });
    });
  });
}

function expand(expandId) {

  var factor = parseInt(expandId[1]);
  var toLeft = "-=" + (160 * (factor-1)).toString() + "px";

  $("#" + expandId).children('span').fadeOut('fast', function() {

    $("#" + expandId).animate({
      marginTop: "+=100px", height: "+=400"},
      300, "easeOutCubic", function() {
        $("#" + currentId).children('span').css({
          //'margin-top': '20px'
        });
        $(this).animate({
          marginLeft: toLeft,
          width: '+=1120px'},
          400, "easeOutCubic", function() {
            $("#" + expandId).children('.eventname').css({ 'margin-top': 10 });
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
  $("#" + revertId).children('.bottompanel').fadeOut('fast', function() {

  });
}

function expanded(expandId) {
  $("#" + expandId).children('.bottompanel').fadeIn('fast', function() {

  });
}

function marked() {
  if ($(this).parent().children('.switch').prop('checked')) {
    $(this).parent().children('.switch').prop('checked', false);
  }
  else {
    $(this).parent().children('.switch').prop('checked', true);
  }
  if ($(this).parent().children('.switch').is(":checked")) {

    $(this).animate({
      'left': '30px'},
      'fast', function() {
      /* stuff to do after animation is complete */
    });
    $(this).parent().children('.mark').html("This event has been marked");
  }
  else {
    $(this).animate({
      'left': '-5px'},
      'fast', function() {
      /* stuff to do after animation is complete */
    });
    $(this).parent().children('.mark').html("Mark this event for registration");
  }

}
