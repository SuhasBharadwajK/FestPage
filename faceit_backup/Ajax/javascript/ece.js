/*
TODO: Second opening animation takes way too much time. Find a fix ASAP. - DONE!!
*/

var currentId, activeId = "l1";
var count = 0, tcount = 0;
var yearActive = false, branchActive = false;
var eventPage = true;
var poppedup = false;
eventImages = Array("clang.png", "java.png", "lanparty.png");
topMargins = Array(25, 25, 25, 25, 25, 25, 15, 15);
markedEvents = Array();
toasts = Array();
var widths = Array(1270, 1265, 1265, 1262);

//console.log(navigator.userAgent);
if (navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1) {
  console.log("Fire-fucking-fox? Seriously? You couldn't get a better browser? Get Chrome. Get a life.");
  //topMargins = Array(6, 5, 27, 20, 8, 5, 12, 12);
}
// else if (navigator.userAgent.indexOf("Chrome") > -1) {
//   topMargins = Array(6, 5, 30, 10, 12, 5, 12, 12);
// }
switches = Array("#switch1", "#switch2", "#switch3", "#switch4", "#switch5", "#switch6", "#switch7", "#switch8");

$(document).ready(function() {

  $("#l1").children('span').fadeOut('fast', function() {
    eventPage = true;
    $("#l1").animate({
      marginTop: "+=100px", height: "+=400", backgroundColor: 'white'},
      300, "easeOutCubic", function() {
        $(this).animate({
          width: '1262'},
          300, "easeOutCubic", function() {
            //console.log("FIRRRSST");
            $("#l1").children('.eventname').css({ 'margin-top': 10 });
            $("#l1").children('.eventdescription').fadeIn('slow');
            $("#l1").children('.bottompanel').fadeIn('fast', function() {
              //console.log("faded in");
            });
            $(this).children('span').fadeIn('400');
        });
    });

    // $('.descright').hover(function() {
    //   $('descright::-webkit-scrollbar').fadeIn('fast', function() {
    //
    //   });
    // }, function() {
    //   $('descright::-webkit-scrollbar').fadeOut('fast', function() {
    //
    //   });
    // });

    $(".switch").change(function(event) {

      if ($(this).is(":checked")) {
        $(this).parent().children('.mark').html("This event has been marked");
        if (markedEvents.indexOf($(this).parent().parent().parent().children('.eventname').html()) < 0) {
          markedEvents.push($(this).parent().parent().parent().children('.eventname').html());
        }
        //lastEvent = $(this).parent().parent().parent().children('.eventname').html();
        count++;
        console.log(markedEvents);
      }

      else {
        $(this).parent().children('.mark').html("Mark this event for registration");
        markedEvents.splice(markedEvents.indexOf($(this).parent().parent().parent().children('.eventname').html()), 1);
        // if (lastEvent == $(this).parent().parent().parent().children('.eventname').html()) {
        //   lastEvent = markedEvents.pop();
        //   //markedEvents.push(lastEvent);
        //
        // }

        count--;
        console.log(markedEvents);
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
    }, 2000);

  });


  $(".registerbutton").click(function() {
    //$(this).

    var $eventName = $(this).parent().parent().children('.eventname').html()
    // console.log("THIS" + $eventName);
    // console.log("THIS" + $(this));
    if (markedEvents.indexOf($eventName) < 0) {
      markedEvents.push($eventName);
      count++;
      //console.log("WWW" + $(this));
    }
    $(this).parent().children('.marker').children('.switch').prop('checked', true);
    $(this).parent().children('.marker').children('.mark').html("This event has been marked");
    $(this).parent().children('.marker').children('.forff').animate( {'left': '30px'}, 'fast');
    popitup();

  });
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
  $("#branch").click(showBranch);

  $('#rollno').click(function(event) { hideYear(); hideBranch(); });
  $('#phno').click(function(event) { hideYear(); hideBranch(); });
  $('#name').click(function(event) { hideYear(); hideBranch(); });
  $('#college').click(function(event) { hideYear(); hideBranch(); });
  $('#email').click(function(event) { hideYear(); hideBranch(); });
  $('.markedevents').click(function(event) { hideYear(); hideBranch(); });
  $('.markedheading').click(function(event) { hideYear(); hideBranch(); });

  $(".whichyear").click(function(event) {
    hideYear();
    $("#year").children('span').html($(this).attr("value"));
  });

  $(".whichbranch").click(function(event) {
    hideBranch();
    $("#branch").children('span').html($(this).attr("value"));
  });

  /*
                DELETE EVENT
  */
  $('.deleteevent').click(function(event) {
    //alert("Will Close!");
    var $eventToDelete = $(this);
    $eventToDelete.parent().fadeOut(400, function() {$eventToDelete.parent().remove();});
  });

});

function popitup() {
  //console.log($(this));
  //var $event = $(this);

  //lastEvent = $(this).parent().parent().children('.eventname').html();

  console.log(markedEvents);

  fillWithEvents($(this));

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
        height: 0,
        width: 0,
        marginTop:300,
        marginLeft:600,
        borderRadius: 50},
        'slow', "easeInOutQuint");
      $('.popup').fadeOut('fast');
      $('div').clearQueue();
      poppedup = false;
    });
    hideYear();
    hideBranch();
  }
}

function showYear() {
  if (!yearActive) {
    $(".yearlist").show().animate({
      height: "200px"},
      300);
    $(".whichyear").fadeIn('fast', function(){yearActive = true;});
  }
  hideBranch();
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

function showBranch() {
  if (!branchActive) {
    $(".branchlist").show().animate({
      height: "300px"},
      300);
    $(".whichbranch").fadeIn('fast', function(){branchActive = true;});
  }
  hideYear();
}

function hideBranch() {
  if (branchActive) {
    $(".branchlist").fadeOut(200, function() {
      $('.branchlist').animate({
        height: "50px"},
        300);
      $(".whichbranch").hide();
      branchActive = false;
    });
  }
}

function fillWithEvents($fillArea) {
  console.log($fillArea);
  var finalCount = 1;
  if (count == 8) {
    finalCount = 8;
  }
  $(".markedevents").html("");
  for (markedEvent in markedEvents) {
    var number = parseInt(markedEvent) + 1;
    var newEvent = '<div class="markedevent m' + number + '"><span class="oneevent e' + number + '">' + markedEvents[markedEvent] +'</span><div class="deleteevent"><img src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-22-128.png" alt="images/closesmall.png" /></div></div>'
    $(".markedevents").append(newEvent);
  }

  $('.deleteevent').click(function(event) {
    var $eventToDelete = $(this);
    $eventToDelete.parent().fadeOut(400, function() {$eventToDelete.parent().remove();});
    for (var i = 1; i <= 8; i++) {
      if ($("#l" + i).children('.eventname').html() == $eventToDelete.parent().children('.oneevent').html()) {
        $("#l" + i).children('.bottompanel').children('.marker').children('.switch').prop('checked', false);
        $("#l" + i).children('.bottompanel').children('.marker').children('.mark').html('Mark this event for registration');
        markedEvents.splice(markedEvents.indexOf($("#l" + i).children('.eventname').html()), 1);
        $("#l" + i).children('.bottompanel').children('.marker').children('.forff').animate( {'left': '-5px'}, 'fast');
        //toast($("#l" + i).children('.eventname').html()); //TODO Ucomment after implementing proper toast mechanism.
      }
    }
  });
  // if (!$fillArea.parent().children('.marker').children('.switch').is(':checked') || true) {
  //   //var newEvent = '<div class="markedevent" id="m' + count + '"><span class="oneevent" id="e' + count+ '">' + lastEvent +'</span><div class="deleteevent"><img src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-22-128.png" alt="images/closesmall.png" /></div></div>'
  //   //$(".markedevents").append(newEvent)
  //   // for (markedEvent in markedEvents) {
  //   //   var newEvent = '<div class="markedevent" id="m' + count + '"><span class="oneevent" id="e' + count+ '">' + markedEvents[markedEvent] +'</span><div class="deleteevent"><img src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-22-128.png" alt="images/closesmall.png" /></div></div>'
  //   //   $(".markedevents").html(newEvent);
  //   //   if (lastEvent != markedEvents[markedEvent]) {
  //   //
  //   //   }
  //   // }
  //   // $fillArea.parent().children('.marker').children('.switch').prop('checked', true);
  //   // $fillArea.parent().children('.marker').children('.mark').html("This event has been marked");
  //   // $fillArea.parent().children('.marker').children('.forff').animate( {'left': '30px'}, 'fast');
  //   // $('.deleteevent').click(function(event) {
  //   //   var $eventToDelete = $(this);
  //   //   $eventToDelete.parent().fadeOut(400, function() {$eventToDelete.parent().remove();});
  //   // });
  // }
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
  var toLeft = "+=" + (170 * (factor-1)).toString() + "px";
  var imageUrl = eventImages[factor-1];
  $("#" + revertId).children('.eventdescription').fadeOut('fast');
  // console.log(imageUrl);
  // console.log(factor);

  reversing(revertId);


  $("#" + revertId).children('span').fadeOut('fast', function() {
    $("#" + revertId).animate({
      width: '200px',
      marginLeft: toLeft,
      backgroundColor: 'rgba(255, 255, 255, 1)'},
      200, function() {
        $(this).animate({
          marginTop: '-=100px', height: '-=400px'},
          400, "easeOutCubic", function() {
            if (eventPage) {
              expand(currentId);
            }
            $("#" + revertId).children('.eventname').css({ 'margin-top': topMargins[factor-1] });
            $(this).children('span').fadeIn('fast');
        });
    });
  });
}

function expand(expandId) {

  var factor = parseInt(expandId[1]);
  var toLeft = "-=" + (170 * (factor-1)).toString() + "px";

  $("#" + expandId).children('span').fadeOut('fast', function() {
    $("#" + expandId).animate({
      marginTop: "+=100px", height: "+=400", backgroundColor: 'white'},
      300, "easeOutCubic", function() {
        $("#" + currentId).children('span').css({
          //'margin-top': '20px'
        });
        $(this).animate({
          marginLeft: toLeft,
          width: '1262'},
          400, "easeOutCubic", function() {
            $("#" + expandId).children('.eventname').css({ 'margin-top': 10 });
            $('.events').bind('click', eventClicked);
            $("#" + expandId).children('span').fadeIn('slow', function() {
            });
            $("#" + expandId).children('.eventdescription').fadeIn('slow', function() {
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

function toast($text) {
  if (toasts.indexOf($text) < 0) {
    tcount++;
    toasts.push($text);
    $('body').append('<div class="toast" id="toast' + tcount +  '"></div>');
  }
  if (toasts.length == 1) {
    tcount = 1;
    emptyToats();
  }
  console.log(toasts);
}

function emptyToats() {
  $text = toasts[0];
  console.log(toasts.length);
  while ( toasts.length > 0 ) {
    console.log("INN");
    $('#toast' + tcount).html("You've opted out of " + toasts[0]);
    toasts.splice($text, 1);
    $('#toast' + tcount).animate({
      bottom: '50px'},
      'fast', function() {
      window.setTimeout(function() {
        $('#toast' + tcount).animate({
          bottom: '-150px'},
          'fast', function() {$('#toast' + tcount).remove();});
      },1000);
    });
  }
}



function marked() {
  if ($(this).parent().children('.switch').prop('checked')) {
    $(this).parent().children('.switch').prop('checked', false);
    markedEvents.splice(markedEvents.indexOf($(this).parent().parent().parent().children('.eventname').html()), 1);
  }
  else {
    $(this).parent().children('.switch').prop('checked', true);
    if (markedEvents.indexOf($(this).parent().parent().parent().children('.eventname').html()) < 0) {
      markedEvents.push($(this).parent().parent().parent().children('.eventname').html());
    }
  }
  if ($(this).parent().children('.switch').is(":checked")) {

    $(this).animate({
      'left': '30px'},
      'fast');
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
