/*
TODO: Page specific active IDs so that when the previous page is opened again, it should open the event which was open when the user left.
*/

var currentId, activeId = "l1";
var count = 0, tcount = 0;
var yearActive = false, branchActive = false;
var eventPage = true;
var poppedup = false;
eventImages = Array("clang.png", "java.png", "lanparty.png");
topMargins = [[5, 5, 30, 12, 15, 5, 15, 15]     //CSE
            , [15, 25, 15, 25, 15, 25, 15, 15]  //ECE
            , [15, 25, 25, 25, 15, 25, 15, 15]  //MECH
            , [15, 25, 25, 13, 18, 15, 15, 15]  //CIVIL
            , [25, 25, 25, 25, 15, 25, 15, 15]  //EEE
            , [5, 5, 30, 12, 15, 5, 15, 15]];   //IT
var widths = Array(1270, 1262, 1265, 1270, 1265, 1270);
var factors = Array(160, 182, 213, 160, 213, 160);
var subtracts = Array(10, 12, 13, 10, 13, 10);
var branchevent;
var closingIn = false;
markedEvents = Array();
toasts = Array();

//console.log(navigator.userAgent);
if (navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1) {
  console.log("Fire-fucking-fox? Seriously? You couldn't get a better browser? Get Chrome. Get a life.");
  //topMargins = Array(6, 5, 27, 20, 8, 5, 12, 12);
}
// else if (navigator.userAgent.indexOf("Chrome") > -1) {
//   topMargins = Array(6, 5, 30, 10, 12, 5, 12, 12);
// }
switches = Array("#switch1", "#switch2", "#switch3", "#switch4", "#switch5", "#switch6", "#switch7", "#switch8");

$(document).keyup(function(e) {
  if (e.keyCode == 13) closeBranches();
  if (e.keyCode == 27) closeBranches();
});

// $(document).ready(function() {
//   setHandlers();
// });

function setHandlers() {

    // $("#l1").children('span').fadeOut('fast', function() {
    //   eventPage = true;
    //   $("#l1").animate({
    //     marginTop: "+=100px", height: "+=400", backgroundColor: 'white'},
    //     300, "easeOutCubic", function() {
    //       $(this).animate({
    //         width: '+=1120px'},
    //         300, "easeOutCubic", function() {
    //           //console.log("FIRRRSST");
    //           $("#l1").children('.eventname').css({ 'margin-top': 10 });
    //           $("#l1").children('.eventdescription').fadeIn('slow');
    //           $("#l1").children('.bottompanel').fadeIn('fast', function() {
    //             //console.log("faded in");
    //           });
    //           $(this).children('span').fadeIn('400');
    //       });
    //     });
    //
    //   // $('.descright').hover(function() {
    //   //   $('descright::-webkit-scrollbar').fadeIn('fast', function() {
    //   //
    //   //   });
    //   // }, function() {
    //   //   $('descright::-webkit-scrollbar').fadeOut('fast', function() {
    //   //
    //   //   });
    //   // });
    //
    //
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
}

function expandFirst(bevent) {
  animating = true;
  branchevent = bevent
  //alert(widths[pages.indexOf(currentPage)]);
  //var factor = parseInt(activeIds[pages.indexOf(eventId)][1]); //TODO!! Important. Extend from here.
  var factor = parseInt(activeId[1]);
  var thisWidth = widths[pages.indexOf(currentPage)];
  //var toLeft = "-=" + (factors[pages.indexOf(currentPage)] * (factor-1)).toString() + "px";
  var toLeft = "0px";
  //elementToExpand = branchevent +" #" + activeIds[pages.indexOf(eventId)];
  elementToExpand = branchevent +" #" + activeId;
  $(elementToExpand).children('span').fadeOut('fast', function() {
    eventPage = true;
    $(elementToExpand).animate({
      marginTop: "100px", height: "480px", backgroundColor: 'white'},
      300, "easeOutCubic", function() {
        $(this).animate({
          marginLeft: toLeft,
          width: thisWidth},
          300, "easeOutCubic", function() {
            $(elementToExpand).children('.eventname').css({ 'margin-top': 10 });
            $(elementToExpand).children('.eventdescription').fadeIn('slow');
            $(elementToExpand).children('.bottompanel').fadeIn('fast');
            $(this).children('span').fadeIn('400', function(){$('.topimage').bind('click', closeHomeIn);});
            $('.events').bind('click', eventClicked);
            animating = false;
        });
      });
  });
}

function popitup() {
  //console.log($(this));
  //var $event = $(this);

  //lastEvent = $(this).parent().parent().children('.eventname').html();

  console.log(markedEvents);

  fillWithEvents($(this));

  if (!poppedup) {
    animating = true;
    $(".popup").fadeIn().animate({
      height: 600,
      width: 800,
      marginTop:20,
      marginLeft:240,
      borderRadius: 0},
      'slow', "easeInOutQuint", function() {
        $(this).children().fadeIn('fast');
        poppedup = true;
        animating = false;
    });
  }
}

function popitdown() {
  if (poppedup) {
    animating = true;
    $(".popup").children().fadeOut('fast', function() {
      $('.popup').animate({
        height: 0,
        width: 0,
        marginTop:300,
        marginLeft:640,
        borderRadius: 50},
        'slow', "easeInOutQuint");
      $('.popup').fadeOut('fast');
      $('div').clearQueue();
      poppedup = false;
      animating = false;
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
    //alert(branchevent);
    $eventToDelete.parent().fadeOut(400, function() {$eventToDelete.parent().remove();});
    for (var i = 1; i <= 8; i++) {
      if ($(branchevent + " #l" + i).children('.eventname').html() == $eventToDelete.parent().children('.oneevent').html()) {
        $(branchevent + " #l" + i).children('.bottompanel').children('.marker').children('.switch').prop('checked', false);
        $(branchevent + " #l" + i).children('.bottompanel').children('.marker').children('.mark').html('Mark this event for registration');
        markedEvents.splice(markedEvents.indexOf($(branchevent + "#l" + i).children('.eventname').html()), 1);
        $(branchevent + " #l" + i).children('.bottompanel').children('.marker').children('.forff').animate( {'left': '-5px'}, 'fast');
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
  animating = true;
  $('.topimage').unbind('click', closeHomeIn);
  closeBranches();
  currentId = $(this).attr('id');
  // console.log(currentId);
  // console.log(activeId);
  //activeId = activeIds[pages.indexOf(eventId)];
  if (activeId != currentId) {
    $('.events').unbind('click', eventClicked);
    revert(activeId, currentId);
    activeId = currentId;
    //console.log("Second " + activeId + currentId);
  }

}

function revert(revertId, currentId) {
  animating = true;
  var factor = parseInt(revertId[1]);
  //alert(pages.indexOf(currentPage) + "," + topMargins[pages.indexOf(currentPage)][factor-1]);
  //var toLeft = "+=" + (factors[pages.indexOf(eventId)] * (factor-1)).toString() + "px";
  var toLeft = "" + (factors[pages.indexOf(eventId)] * (factor-1)).toString() + "px";
  var imageUrl = eventImages[factor-1];
  $(branchevent + " #" + revertId).children('.eventdescription').fadeOut('fast');
  // console.log(imageUrl);
  // console.log(factor);

  reversing(revertId);


  $(branchevent + " #" + revertId).children('span').fadeOut('fast', function() {
    $(branchevent + " #" + revertId).animate({
      width:  factors[pages.indexOf(currentPage)] - subtracts[pages.indexOf(currentPage)],
      marginLeft: toLeft,
      backgroundColor: 'rgba(255, 255, 255, 1)'},
      200, function() {
        $(this).animate({
          marginTop: '0px', height: '80px'},
          400, "easeOutCubic", function() {
            if (eventPage) {
              expand(currentId);
            }
            else {
              animating = false;
            }
            $(branchevent + " #" + revertId).children('.eventname').css({ 'margin-top': topMargins[pages.indexOf(currentPage)][factor-1] });
            $(this).children('span').fadeIn('fast', function(){
              $(branchevent + " #" + currentId).css({
                'cursor': 'pointer'
              });
            });
        });
    });
  });
}

function expand(expandId) {
  animating = true;
  //alert(widths[pages.indexOf(currentPage)] - subtracts[pages.indexOf(currentPage)]);
  var factor = parseInt(expandId[1]);
  //var toLeft = "-=" + (factors[pages.indexOf(currentPage)] * (factor-1)).toString() + "px";
  var toLeft = "0px";

  $(branchevent + " #" + expandId).children('span').fadeOut('fast', function() {
    $(branchevent + " #" + expandId).animate({
      marginTop: "100px", height: "480", backgroundColor: 'white'},
      300, "easeOutCubic", function() {
        $(branchevent + " #" + currentId).css({
          'cursor': 'default !important'
        });
        $(branchevent + " #" + currentId).children('span').css({
          //'margin-top': '20px'
        });
        $(this).animate({
          marginLeft: toLeft,
          width: widths[pages.indexOf(currentPage)]},
          400, "easeOutCubic", function() {
            $(this).css({
              'cursor': 'default !important'
            });
            $(branchevent + " #" + expandId).children('.eventname').css({ 'margin-top': 10 });
            $('.events').bind('click', eventClicked);

            $(branchevent + " #" + expandId).children('span').fadeIn('slow', function() {
            });
            $(branchevent + " #" + expandId).children('.eventdescription').fadeIn('slow', function() {
              $('.topimage').bind('click', closeHomeIn);
              animating = false;
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
  $(branchevent + " #" + revertId).children('.bottompanel').fadeOut('fast', function() {

  });
}

function expanded(expandId) {
  $(branchevent + " #" + expandId).children('.bottompanel').fadeIn('fast', function() {

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

$(function() {
  $('.branchlisttop').click(function(event) {
    $(this).children('ul').fadeIn(400, "easeInOutCubic");
  });
})

function closeBranches() {
  $('.branchlisttop').children('ul').fadeOut(300, "easeInOutCubic");
}
