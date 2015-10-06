/*
TODO: Page specific active IDs so that when the previous page is opened again, it should open the event which was open when the user left.
*/

var currentId = "l1", activeId = "l1";
var count = 0, tcount = 0;
var yearActive = false, branchActive = false;
var eventPage = true;
var poppedup = false;
var currentPageEvent;
topMargins = [[5, 5, 30, 15, 15, 28, 5, 15, 15], [15, 25, 15, 25, 15, 25, 15, 15, 15], [15, 25, 25, 25, 15, 25, 15, 15, 15], [15, 25, 25, 13, 18, 15, 15, 15, 15], [25, 25, 25, 25, 25, 25, 15, 15, 15], [5, 5, 30, 12, 15, 5, 15, 15, 15]];
var widths = Array(1268, 1262, 1265, 1270, 1265, 1270);
var factors = Array(142, 182, 213, 160, 213, 160);
var subtracts = Array(12, 12, 13, 10, 13, 10);
var branchevent;
var closingIn = false;
var markedEvents = Array();
var markedEventCodes = Array();
var registeredEventIds = Array();
toasts = Array();
if (navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1) {
  console.log("Fire-fucking-fox? Seriously? You couldn't get a better browser? Get Chrome. Get a life.");
}
switches = Array("#switch1", "#switch2", "#switch3", "#switch4", "#switch5", "#switch6", "#switch7", "#switch8");

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    closeBranches();
    if (poppedup) {
      popitdown();
    }
  }
});

function setHandlers() {
    $(".switch").change(function(event) {
      currentPageEvent = "." + currentPage + "events" + " #" + currentId;
      if ($(this).is(":checked")) {
        $(this).parent().children('.mark').html("This event has been marked");
        if (markedEventCodes.indexOf($(this).parent().parent().parent().children('.eventname').attr('value')) < 0) {
          markedEventCodes.push($(this).parent().parent().parent().children('.eventname').attr('value'));
        }
        if (markedEvents.indexOf($(this).parent().parent().parent().children('.eventname').html()) < 0) {
          markedEvents.push($(this).parent().parent().parent().children('.eventname').html());
          if (registeredEventIds.indexOf(currentPageEvent) < 0) {
            registeredEventIds.push(currentPageEvent);
          }
        }
        count++;
      }

      else {
        $(this).parent().children('.mark').html("Mark this event for registration");
        markedEvents.splice(markedEvents.indexOf($(this).parent().parent().parent().children('.eventname').html()), 1);
        registeredEventIds.splice(registeredEventIds.indexOf(currentPageEvent), 1);
        markedEventCodes.splice($(this).parent().parent().parent().children('.eventname').attr('value'), 1);
        count--;
      }
    });

    $(".register").click(function(event) {
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
      }, 2000);

    });

    $(".registercancel").click(function(event) {
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
      }, 500);

    });


    $(".registerbutton").click(function() {
      var $eventName = $(this).parent().parent().children('.eventname').html()
      currentPageEvent = "." + currentPage + "events" + " #" + currentId;
      if (markedEventCodes.indexOf($(this).parent().parent().children('.eventname').attr('value')) < 0) {
        markedEventCodes.push($(this).parent().parent().children('.eventname').attr('value'));
      }
      if (markedEvents.indexOf($eventName) < 0) {
        markedEvents.push($eventName);
        count++;
        if (registeredEventIds.indexOf(currentPageEvent) < 0) {
          registeredEventIds.push(currentPageEvent);
        }
      }
      $(this).parent().children('.marker').children('.switch').prop('checked', true);
      $(this).parent().children('.marker').children('.mark').html("This event has been marked");
      $(this).parent().children('.marker').children('.forff').animate( {'left': '30px'}, 'fast');
      popitup();

    });
    $("#minimizebutton").click(popitdown);

    for(aswitch in switches) {
      if ($(switches[aswitch]).is(":checked")) {
          $(switches[aswitch]).parent().children(".forff").css({'left':'30px'});
          $(switches[aswitch]).parent().children('.mark').html("This event has been marked");
      }
      else {
        $(switches[aswitch]).parent().children(".forff").css({'left':'-5px'});
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

}

function expandFirst(bevent) {
  animating = true;
  branchevent = bevent
  var factor = parseInt(activeId[1]);
  var thisWidth = widths[pages.indexOf(currentPage)];
  var toLeft = "0px";
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
            goingBack = false;
        });
      });
  });
}

function popitup() {

  fillWithEvents($(this));

  if (!poppedup) {
    $('.popup').css({
      'background-color': 'white'
    });
    animating = true;
    $(".popup").fadeIn().animate({
      height: 600,
      width: 765,
      marginTop:0,
      marginLeft:255,
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
      $('.successtext').remove();
      $('.successtick').remove();
      $('.popup').animate({
        height: 0,
        width: 0,
        marginTop:300,
        marginLeft:640,
        borderRadius: 50},
        'slow', "easeInOutQuint");
      $('.popup').fadeOut('fast', function() {
        $('.popup').css({
          'background-color': 'white'
        });
      });
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
  else {
    hideYear();
  }
  hideBranch();
}

function hideYear() {
  if (yearActive) {
    $(".yearlist").fadeOut(200, function() {
      $('.yearlist').animate({
        height: "50px"},
        100);
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
  else {
    hideBranch();
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
  var finalCount = 1;
  if (count == 8) {
    finalCount = 8;
  }
  $(".markedevents").html("");
  for (markedEvent in markedEvents) {
    var number = parseInt(markedEvent) + 1;
    var newEvent = '<div class="markedevent m' + number + '"><span class="oneevent e' + number + '">' + markedEvents[markedEvent] +'</span><div class="deleteevent"><img src="images/closesmall.png" alt="images/closesmall.png" /></div></div>'
    $(".markedevents").append(newEvent);
  }

  $('.deleteevent').click(function(event) {
    var $eventToDelete = $(this);
    //alert(branchevent);
    $eventToDelete.parent().fadeOut(400, function() {$eventToDelete.parent().remove();});
    for (var i = 1; i <= 9; i++) {
      if ($(branchevent + " #l" + i).children('.eventname').html() == $eventToDelete.parent().children('.oneevent').html()) {
        $(branchevent + " #l" + i).children('.bottompanel').children('.marker').children('.switch').prop('checked', false);
        $(branchevent + " #l" + i).children('.bottompanel').children('.marker').children('.mark').html('Mark this event for registration');
        markedEvents.splice(markedEvents.indexOf($(branchevent + "#l" + i).children('.eventname').html()), 1);
        markedEventCodes.splice($(branchevent + "#l" + i).children('.eventname').attr('value'), 1);
        $(branchevent + " #l" + i).children('.bottompanel').children('.marker').children('.forff').animate( {'left': '-5px'}, 'fast');
      }
    }
  });
}

function eventClicked() {
  if (poppedup) {
    popitdown();
  }
  closeBranches();
  currentId = $(this).attr('id');
  if (activeId != currentId) {
    animating = true;
    $('.events').unbind('click', eventClicked);
    $('.topimage').unbind('click', closeHomeIn);
    revert(activeId, currentId);
    activeId = currentId;
  }

}

function revert(revertId, currentId) {
  animating = true;
  var factor = parseInt(revertId[1]);
  var toLeft = "" + (factors[pages.indexOf(eventId)] * (factor-1)).toString() + "px";
  $(branchevent + " #" + revertId).children('.eventdescription').fadeOut('fast');
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
              $('.topimage').unbind('click', closeHomeIn);
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
  var factor = parseInt(expandId[1]);
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
}

function emptyToats() {
  $text = toasts[0];
  while ( toasts.length > 0 ) {
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
  currentPageEvent = "." + currentPage + "events" + " #" + currentId;
  if ($(this).parent().children('.switch').prop('checked')) {
    $(this).parent().children('.switch').prop('checked', false);
    markedEvents.splice(markedEvents.indexOf($(this).parent().parent().parent().children('.eventname').html()), 1);
    registeredEventIds.splice(registeredEventIds.indexOf(currentPageEvent));
    markedEventCodes.splice(markedEventCodes.indexOf($(this).parent().parent().parent().children('.eventname').attr("value")), 1);
  }
  else {
    $(this).parent().children('.switch').prop('checked', true);
    if (markedEventCodes.indexOf($(this).parent().parent().parent().children('.eventname').attr('value')) < 0) {
      markedEventCodes.push($(this).parent().parent().parent().children('.eventname').attr('value'));
    }
    if (markedEvents.indexOf($(this).parent().parent().parent().children('.eventname').html()) < 0) {
      markedEvents.push($(this).parent().parent().parent().children('.eventname').html());
      if (registeredEventIds.indexOf(currentPageEvent) < 0) {
        registeredEventIds.push(currentPageEvent);
      }
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
      'fast');
    $(this).parent().children('.mark').html("Mark this event for registration");
  }

}

$(function() {
  $('.branchlisttop').click(function(event) {
    if (topListOpen) {
        closeBranches();
    }
    else {
      $(this).children('ul').fadeIn(400, "easeInOutCubic");
      topListOpen = true;
    }
  });
})

function closeBranches() {
  $('.branchlisttop').children('ul').fadeOut(300, "easeInOutCubic");
  topListOpen = false;
}
