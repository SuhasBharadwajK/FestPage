var opened = false;
var openedId = "";
var mobilePopedup = false;
var fromBranch = false;

$('document').ready(function() {
  $('.navbranch').click(openEvents);
  setMobileHandlers();
});

function setMobileHandlers() {
  $('.card').click(expandCard);
  $('.closeimg').click(closeCard);
  $('.regbutt').click(buttPressed);
  for(keyElement in keyElements) {
    $(keyElements[keyElement]).swipe( {
      swipeRight:openNav, swipeLeft:closeNav, threshold:80
    });
  }
  for(keyElement in keyElements) {
    if (keyElements[keyElement] != ".navdrawer") {
      $(keyElements[keyElement]).click(function(event) {
        closeNav();
      });
    }
  }
  $('.markbox').change(function(event) {
    if ($(this).is(":checked")) {
      $(this).parent().children('.marklabel').html("Marked!");
      if (markedEventCodes.indexOf($(this).parent().parent().parent().parent().children('.eventheadingmobile').attr('value')) < 0) {
        markedEventCodes.push($(this).parent().parent().parent().parent().children('.eventheadingmobile').attr('value'));
      }
      if (registeredEventIds.indexOf(currentPageEvent) < 0) {
        registeredEventIds.push($(this).parent().parent().parent().parent().attr('id'));
      }
      if (markedEvents.indexOf($(this).parent().parent().parent().parent().children('.eventheadingmobile').html()) < 0) {
        markedEvents.push($(this).parent().parent().parent().parent().children('.eventheadingmobile').html());
      }
    }
    else {
      $(this).parent().children('.marklabel').html("Mark this event");
      markedEvents.splice(markedEvents.indexOf($(this).parent().parent().parent().parent().children('.eventheadingmobile').html()), 1);
      markedEventCodes.splice($(this).parent().parent().parent().parent().children('.eventheadingmobile').attr('value'), 1);
      registeredEventIds.splice($(this).parent().parent().parent().parent().attr('id'), 1);
    }
  });
}

function expandCard() {
  $(this).unbind('click', expandCard);
  if(!opened) {
       $(this).animate({
          height: '450px'
       }, 200, function() {
           $(this).css({'overflow-y' : 'auto'});
           $(this).children('.closeimgholder').css({'display': 'block'});
       });
      opened = true;
      openedId = $(this).attr('id');
  }
  else {
    $('#' + openedId).animate({
        height: '80px'
    }, 200, function() {
      $(this).css({'overflow-y' : 'hidden'});
      $(this).bind('click', expandCard);
      $(this).children('.closeimgholder').css({'display': 'none'});
      var myDiv = document.getElementById($(this).attr('id'));
      myDiv.scrollTop = 0;
      opened = true;
    });
    opened = true;
    $(this).animate({
       height: '450px'
    }, 200, function() {
        $(this).css({'overflow-y' : 'auto'});
        $(this).children('.closeimgholder').css({'display': 'block'});
    });
   opened = true;
   openedId = $(this).attr('id');
  }
}

function closeCard() {
  $('#' + openedId).animate({
   height: '80px'
 }, 200, function() {
     $(this).css({'overflow-y' : 'hidden'});
     $(this).bind('click', expandCard);
     $(this).children('.closeimgholder').css({'display': 'none'});
  });
  $('#' + openedId).scrollTop = 0;
  var myDiv = document.getElementById($('#' + openedId).attr('id'));
  myDiv.scrollTop = 0;
  opened = false;
  openedId = "";
}

function openEvents() {
  openedId = "";
  closeNav();
  if (pageStack[pageStack.length - 1] != currentPage) {
    pageStack.push(currentPage);
  }
  currentPage = $(this).attr("value");
  if (currentPage != "home") {
    fromBranch = true;
    clearInterval(backgroundChange);
    $('.lefthalf').css({'display' : 'none'});
    $('.righthalf').css({'display' : 'none'});
    $('.socialbuttons').css({'display' : 'none'});
    $('.mobileholder').html(pagesGot[pages.indexOf(currentPage)]);
    setMobileHandlers();
    for (registeredEventId in registeredEventIds) {
      $("#" + registeredEventIds[registeredEventId] + " .markbox").prop('checked', true);
      $("#" + registeredEventIds[registeredEventId] + " .marklabel").html("Marked!");
    }
    $('.mobileholder').css({'display' : 'block'});
    $('.hamburger').css({'visibility' : 'collapse'});
  }
  else {
    $('.lefthalf').css({'display' : 'block'});
    $('.righthalf').css({'display' : 'block'});
    $('.socialbuttons').css({'display' : 'block'});
    fromBranch = false;
    $('.mobileholder').css({'display' : 'none'});
    $('.hamburger').css({'visibility' : 'visible'});
    backgroundChange = setInterval(changeBackground, 3500);
  }

}

function buttPressed() {
  $(this).parent().children('.markbox').prop('checked', true);
  if (markedEventCodes.indexOf($(this).parent().parent().parent().parent().children('.eventheadingmobile').attr('value')) < 0) {
    markedEventCodes.push($(this).parent().parent().parent().parent().children('.eventheadingmobile').attr('value'));
  }
  if (registeredEventIds.indexOf($(this).parent().parent().parent().parent().attr('id')) < 0) {
    registeredEventIds.push($(this).parent().parent().parent().parent().attr('id'));
  }
  if (markedEvents.indexOf($(this).parent().parent().parent().parent().children('.eventheadingmobile').html()) < 0) {
    markedEvents.push($(this).parent().parent().parent().parent().children('.eventheadingmobile').html());
  }
  $(this).parent().children('.marklabel').html("Marked!");
  fillWithEventsMobile();
  $('.mobilepopup').css({'display': 'block'});
}

function minimizeMobile() {
  $('.mobilepopup').css({'display': 'none'});
}

function fillWithEventsMobile() {
  $(".markedeventsmobile").html("");
  for (markedEvent in markedEvents) {
    var number = parseInt(markedEvent) + 1;
     var newEvent = '<div class="markedeventmobile m' + number + '"><span class="oneevent e' + number + '">' + markedEvents[markedEvent] +'</span><div class="deleteeventmobile"><img src="images/closesmall.png" alt="images/closesmall.png" /></div></div>'
    $(".markedeventsmobile").append(newEvent);
    $('.deleteeventmobile').click(deleteMobile);
  }
}

function deleteMobile() {
  eventToDelete = $(this);
  $("#" + registeredEventIds[markedEvents.indexOf(eventToDelete.parent().children('span').html())] + " .markbox").prop('checked', false);
  $("#" + registeredEventIds[markedEvents.indexOf(eventToDelete.parent().children('span').html())] + " .marklabel").html("Mark this event");
  registeredEventIds.splice(registeredEventIds[markedEvents.indexOf(eventToDelete.parent().children('.markedeventmobile').children('span').html())], 1);
  markedEvents.splice(eventToDelete.parent().children('.markedeventmobile').children('span').html(), 1);
  eventToDelete.parent().remove();
}

function mobileRegister() {
  registerFromMobile();
}

function registerFromMobile() {
  var validCount = 0;
  mobile = "Yes";
  name = $("#mobilename").val();
  email = $("#mobileemail").val();
  college = $("#mobilecollege").val();
  rollnum = $("#mobilerollnum").val();
  year = $('.mobileyear :selected').text();
  branch = $('.mobilebranch :selected').text();
  phonenum = $("#mobilephonenum").val();
  allEvents = "";
  eventCodes = JSON.stringify(markedEventCodes);
  refcode = $("#mobilerefcode").val();
  var dataToSend

  if (name == "") {
    setTimeout(function(){
      alert("You wanted to register without a name? Come on! You can't be serious!");
    }, 550);
  }
  else if (!/^([A-Z]{1}[.]?[a-z]*[^!_@#$%\^\-0-9]*[\s]?)([A-Z]{1}[.]?[a-z]*[^!_@#$%\^\-0-9]*[\s]?)*$/.test(name)) {
    alert("Would you mind entering your name properly? It's your name after all, isn't it? So, please.")
  }
  else {
    validCount++;
    if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(email)) {
      setTimeout(function(){
        alert("Email should be in the form: someone@somesite.com. See what you typed, again. Please. For the love of Batman.");
      }, 550);
    }
    else {
      validCount++;
      if (college == "") {
        setTimeout(function(){
          alert("You don't go to a college? Isn't that sad? Well, if you do, then enter your college's name.")
        }, 550);
      }
      else {
        validCount++;
        if (rollnum == "") {
          setTimeout(function(){
            alert("Didn't your college give you a roll number? Isn't that sadder? Then enter your roll number!")
          }, 550);
        }
        else {
          validCount++;
          if (year == "Year") {
            setTimeout(function(){
              alert("You've studied for a year, at the least, haven't you? Select your year then!");
            }, 550);
          }
          else {
            validCount++;
            if (branch == "Branch") {
              setTimeout(function(){
                alert("Do you even engineering bro? Then select your branch mister/miss/whatever.");
              }, 550);
            }
            else {
              validCount++;
              if (!/^[7-9]{1}\d{9}$/.test(phonenum)) {
                setTimeout(function(){
                  alert("An Indian mobile phone number contains 10 digits, starting with 9, 8 or 7. What age are you from? The Stone one?");
                }, 550);
              }
              else {
                validCount++;
                if (markedEvents.length == 0) {
                  setTimeout(function(){
                    alert("Oh! So you want to register but don't want to participate in any event. Then what exactly are you registering for? Just tinker around with this beautiful website and go mind your business.");
                  }, 550);
                }
                else {
                  validCount++;
                }
              }
            }
          }
        }
      }
    }
  }
  if (validCount == 8) {
    for (anEvent in markedEvents) {
      if (anEvent == markedEvents.length - 1) {
        allEvents += markedEvents[anEvent].replace("&nbsp;", "");
      }
      else {
        allEvents += markedEvents[anEvent].replace("&nbsp;", "") + ",";
      }
    }

    dataToSend = 'name=' + name + '&email=' + email + '&college=' + college + '&rollnum=' + rollnum + '&year=' + year + '&branch=' + branch + '&phonenum=' + phonenum + '&allevents=' + allEvents + '&eventCodes=' + eventCodes + '&refcode=' + refcode + '&mobile=' + mobile;

    $.ajax({
      url: 'register.php',
      type: 'POST',
      data: dataToSend,
      cache: false,
      success: function(result) {
        if (result.indexOf("Duplicate") >= 0) {
          setTimeout(function() {alert("Uh oh! It appears you, or someone else, has already registered for these events with that email. Try something else.")}, 550);
        }
        else {
          successfulRegisterMobile(name);
        }
      }
    });

  }
}

function successfulRegisterMobile(name) {
  $('.mobileholder').html("");
  $('.mobileholder').css({'display' : 'none'});
  $('.hamburger').css({'visibility' : 'visible'});
  $("#mobilename").val("");
  $("#mobileemail").val("");
  $("#mobilecollege").val("");
  $("#mobilerollnum").val("");
  $("#mobilephonenum").val("");
  $("#mobilerefcode").val("");
  $(".markedeventsmobile").html("");
  $('.mobileyear').prop('selectedIndex',0);
  $('.mobilebranch').prop('selectedIndex',0);
  $('.mobilepopup').children().fadeOut('fast');
  for (registeredEventId in registeredEventIds) {
    $("#" + registeredEventIds[registeredEventId] + " .markbox").prop('checked', false);
    $("#" + registeredEventIds[registeredEventId] + " .marklabel").html("Mark this event");
  }
  registeredEventIds = Array();
  markedEvents = Array();
  $('.mobilepopup').animate({
    backgroundColor: 'rgb(4, 179, 68)'},
    800, function() {
      $('.mobilepopup').append("<img class='successtick' src='images/tick.png' /> <div class='successtext'>Thank you, " + name + ", for your registration. See you soon!</div><button class='closegreen'>Close</button>");
      $('.successtext').fadeIn(500);
      $('.successtick').css({
        '-webkit-transform': 'rotateY(0deg)',
        '-o-transform': 'rotateY(0deg)',
        '-ms-transform': 'rotateY(0deg)',
        '-moz-transform': 'rotateY(0deg)'
      });
      $('.closegreen').click(function(event) {
        location.reload();
      });
  });
}
