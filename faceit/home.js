var images = Array("pic.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg", "pic6.jpg", "pic7.jpg", "background.jpg", "pic.jpg");
var imagesGot = Array();
var pagesGot = Array();
var keyElements = Array(".overlay", ".firstLine", ".secondLine", ".presents", "#flogo", ".navdrawer", ".card", ".mobileholder");
var elementsNumber = 8;
var currentPage = "home";
var stateChanged = false;
var pages = Array("cse", "ece", "mech", "civ", "eee", "it");
var branchNames = Array("CSE", "ECE", "MECH", "CIVIL", "EEE", "IT");
var festTitle = "fACEit 2k15 - A National Level Technical Symposium";
var branchTitles = [["Department of Computer Science and Engineering"],["Department of Electronics and Communication Engineering"],["Department of Mechanical Engineering"],["Department of Civil Engineering"],["Department of Electrical and Electronics Engineering"],["Deparment of Information Technology"]];
var activeIds = Array("l1", "l1", "l1", "l1", "l1", "l1");
var currentIds = Array("", "", "", "", "", "");
var pageStack = Array();
var forwardStack = Array();
var currentImage = 0;
var currentBackground = 0, otherBackground = "";
var lastPage = "";
var mobileDevice = false, navactive = false;
var $dragging = null;
var left = undefined;
var backgroundChange;
var eventId, nexteventId;
var goingBack = false;
var animating = true;
var topListOpen = false;


function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 1000);
    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
  if($(window).width() > 1219) {
    fileCount = 0;
    for (var i = 0; i < pages.length; i++) {
      $.ajax({
        url: 'pages/' + pages[i] + '.html',
        type: 'GET',
        async: false,
        cache: true,
        success: function(response) {
          pagesGot.push(response);
          fileCount++;
          if (fileCount == pages.length) {
            doneLoading();
          }
        }
      });

    }
  }
  else {
    fileCount = 0;
    for (var i = 0; i < pages.length; i++) {
      $.ajax({
        url: 'pages/mobile' + pages[i] + '.html',
        type: 'GET',
        async: false,
        cache: true,
        success: function(response) {
          pagesGot.push(response);
          fileCount++;
          if (fileCount == pages.length) {
            doneMobileLoading();
          }
        }
      });
    }
  }
  show('container', true);
});

function doneLoading() {
    $("#loadingoverlay").fadeOut('slow', function() {

      $('.lefthalf').animate({
        marginLeft: '+=42.5%'
        },
        800, 'easeOutCirc', function() {
          $('.firstLine').animate({
            marginLeft: '+=400px'
            }, 500);
          $('.secondLine').animate({
            marginLeft: '+=550px'
            },
            700);
        $('.presents').animate({
          marginLeft: '+=600px'
          },
          900, function() {
            $('#flogo').fadeIn('slow', function() {

            $('.socialbuttons').animate({
              bottom: "+=60px"
            },'100');
            $('.socialaddress').animate({
              bottom: '+=85px'
            }, '100');
          });
        });
      });
      $('.backgroundimage').animate({
        right: '+=57.5%'
        },
        800, 'easeOutCirc');

      $('.backgroundimage1').animate({
        right: '+=57.5%'
        },
        800, 'easeOutCirc');

      $('.righthalf').animate({
        marginRight: '+=57.5%'
        },
        800, 'easeOutCirc', function() {
          $("#faceit").fadeTo('fast', 1, function() {
            $("#centerlogo").fadeTo('fast', 0.6);


            $("#cse").fadeTo('fast', 1, function() {
              $(this).animate({
                left: "+=18px",
                top: "+=32px"
                },
                800);
              });

            $("#ece").fadeTo('fast', 1, function() {
              $(this).animate({
                left: "-=18px",
                top: "+=32px"
                },
                800);
              });

            $("#mech").fadeTo('fast', 1, function() {
              $(this).animate({
                left: "+=20px"
                },
                800);

            });
            $("#civ").fadeTo('fast', 1, function() {
              $(this).animate({
                left: "-=20px"
                },
                800);
              });

            $("#it").fadeTo('fast', 1, function() {
              $(this).animate({
                left: "+=20px",
                top: "-=20px"
                },
                800);
              });

            $("#eee").fadeTo('fast', 1, function() {
              $(this).animate({
                left: "-=20px",
                top: "-=20px"
                },
                800, function() {animating = false;});
              });
          });
        });
    });
}

function doneMobileLoading() {
  $("#loadingoverlay").fadeOut('slow', function() {
    $('.socialbuttons').animate({
            bottom: '+=60px'},
            "fast");
  });
}

 window.onbeforeunload = function() {
   if(stateChanged){
      return "If you refresh this page, the data you entered and the changes you made will not be saved.";
    }
 };

window.onload = function () {
    if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
            history.pushState('newjibberish', null, null);
            if (!animating) {
              goBack();
            }
        };
    }
    else {
        var ignoreHashChange = true;
        window.onhashchange = function () {
            if (!ignoreHashChange) {
                ignoreHashChange = true;
                window.location.hash = Math.random();
            }
            else {
                ignoreHashChange = false;
            }
        };
    }
}

$(document).ready(function() {
  respond();
  setHeight();
  $(window).keydown(function(event) {
    if (event.keyCode == 40) {
      event.preventDefault();
    }
    else if (event.keyCode == 9 || event.keyCode == 39) {
      if ($('.group').children('input').is(":focus")) {
        return true;
      }
      else {
        event.preventDefault();
      }
    }
  });

  if ($('.forminput').val() != "") {
    $('.forminput').val("");
  }

  $('.hexagon').click(function(event) {
    animating = true;
    $('.topimage').unbind('click', closeHomeIn);
    event.preventDefault();
    eventId = $(this).attr("id");
    if (eventId != "faceit") {
      if (pageStack[pageStack.length - 1] != currentPage) {
        pageStack.push(currentPage);
      }
      if (eventId == "it") {
        currentPage = "it";
      }
      else {
        currentPage = eventId;
      }
      document.title = branchTitles[pages.indexOf(currentPage)];

      lastPage = pageStack[pageStack.length - 1];
      $('.' + currentPage +'events').html(pagesGot[pages.indexOf(currentPage)]);
      setHandlers();
      $('.events').unbind('click', eventClicked);

    }

    if (eventId != "faceit") {

      var branch = $(this).children('.hexagon1').children('.hexagon2').children('a').html();
      event.preventDefault();
      $('.branchlisttop').children('span').html(branch);
      $('.branchlisttop').children('ul').children('#' + eventId + 'select').css({'display':'none'});
      if (currentPage != "home") {
        var eventnum = "";
        $('.lefthalf').animate({
          marginLeft: '-42.5%'
          },
          800, function() {
          $(this).fadeOut('fast', function() {

          });
        });
        $('.backgroundimage').animate({
          right: '-57.5%'
          },
          800, 'easeInOutCirc', function() {
          });
        $('.backgroundimage1').animate({
          right: '-57.5%'
          },
          800, 'easeInOutCirc');

        $('.social').fadeOut('fast', function() {

        });
        $('.righthalf').animate({
          marginRight: '-57.5%'
          },
          800, 'easeInOutCirc',function() {
            startEntry(currentPage, eventnum);
          });
      }
    }
  });

  $('.branchfromlist').click(selectFromList);

  $('#centerlogo').click(function(event) {
    window.open('http://aceec.ac.in', '_blank').location;
  });

  $(window).resize(function(event) {
    respond();
  });

  $(document).on('keydown', function(event) {
    if (event.which == 9 || event.keyCode == 9) {
      preventDefault();
    }
  });

  setTimeout(function(){$(window).trigger('click');} , 100);

  backgroundChange = setInterval(changeBackground, 3500);


  $(".socialbutton").hover(function() {
    var id = $(this).attr("id");
    $(this).find('img').fadeOut('fast', function() {
      $(this).attr('src', 'images/' + id + '.png');
      $(this).fadeIn('fast');
    });

    }, function() {
      var id = $(this).attr("id");
      $(this).find('img').fadeOut('fast', function() {
        $(this).attr('src', 'images/' + id + 'white.png');
        $(this).fadeIn('fast');
    });
  });

  $('.branch').click(function(event) {
    event.preventDefault();
    var $dummy = $('<div/>'), rippleOffset = $(this).offset(), x = event.pageX - rippleOffset.left, y = event.pageY - rippleOffset.top;
    $dummy.addClass('ripple');
    var $ripple = $('.ripple');
    $ripple.css({
      'height': $(this).height(),
      'width': $(this).width()
    });
    $dummy.css({
      'top': y - $ripple.height()/2,
      'left': x - $ripple.width()/2
    }).appendTo($(this));
    window.setTimeout(function(){
        $dummy.remove();
    }, 2000);
  });

  $('.hamburger').click(function(event) {
    if (navactive) {
      closeNav();
    }
    else {
      openNav();
    }
  });
  $('#submitbutton').click(register);

  $('.mobilemin').click(minimizeMobile);
  $('.mobilesubmit').click(mobileRegister);

  $('input').on('input', function() {
    stateChanged = true;
  });
});

function startEntry(page, num) {
  animating = true;

  var branchevent = "." + page + "events";
  if (page != "home") {
      $('body').animate({
        backgroundColor: 'rgb(224, 83, 58);'
        },
        'slow', function() {
          $(branchevent).fadeIn('fast');
          for (var i = 1; i <= 9; i++) {
            $(branchevent + " #l" + i).animate({
              top: '50px'},
              500 + 100*i, function () {
                if (registeredEventIds.indexOf(branchevent + " #l" + i) >= 0) {
                  $(branchevent + " #l" + i + " .switch").prop('checked', true);
                  $(branchevent + " #l" + i + " .forff").css({'left':'30px'});
                  $(branchevent + " #l" + i + " .switch").parent().children('.mark').html("This event has been marked.");
                }
              });
          }
          $(".topbar").fadeIn(1400, function() {
              $('div').finish();
              expandFirst(branchevent);
          });
        });
  }
}

function closeHomeIn(backStatus) {
  document.title = festTitle;
  $('.topimage').unbind('click', closeHomeIn);
  animating = true;
  if (!goingBack && pageStack[pageStack.length - 1] != currentPage) {
    if (pageStack[pageStack.length - 1] != currentPage) {
      pageStack.push(currentPage);
    }
    goingBack = false;
  }
  $('.topimage').unbind('click', closeHomeIn);
  closeBranches();
  if (poppedup) {
    $(".popup").children().fadeOut('fast', function() {
      $('.popup').animate({
        height: 0,
        width: 0,
        marginTop:300,
        marginLeft:640,
        borderRadius: 50},
        'slow', "easeInOutQuint");
      $('.popup').fadeOut('fast', function() {onlyRevert(activeId, false); $('div').clearQueue();});

      poppedup = false;
    });
    hideYear();
    hideBranch();
  }

  else {
    onlyRevert(activeId, false);
  }
}


function openHome(previousPage) {
  animating = true;
  currentPage = previousPage;
  $('.topimage').unbind('click', closeHomeIn);
  $('.events').unbind('click', eventClicked);

  $('.lefthalf').animate({
    marginLeft: '-42.5%'
    },
    600, function() {
    $(this).fadeOut('fast', function() {

    });
  });
  $('.backgroundimage').animate({
    right: '-57.5%'
    },
    800, 'easeInOutCirc', function() {
    });
  $('.backgroundimage1').animate({
    right: '-57.5%'
    },
    800, 'easeInOutCirc');

  $('.social').fadeOut('fast', function() {

  });
  $('.righthalf').animate({
    marginRight: '-57.5%'
    },
    800, 'easeInOutCirc',function() {
      startEntry(previousPage, 1);
    });
}

function fadeThemOut() {

  animating = true;

  $('.topbar').fadeOut('slow', function() {
  });
  $('body').animate({
    backgroundColor: 'black'},
    'slow', function() {
      $('.lefthalf').fadeIn('fast', function() {
        $(this).animate({
          marginLeft: '0'},
          800, 'easeOutCirc');
      });
      $('.righthalf').fadeIn('fast', function() {
        $(this).animate({
          marginRight: '0'},
          800, 'easeOutCirc');
      });
      $('.backgroundimage').animate({
        right: '0px'},
        800, 'easeOutCirc');
      $('.backgroundimage1').animate({
        right: '0px'},
        800, 'easeOutCirc', function() {

        $('.social').fadeIn(300, function() {
          currentPage = "home";

          activeId = "l1";

          $('.branchlisttop').children('ul').children('#' + eventId + 'select').css({'display':'block'});

          $('.topimage').bind('click', closeHomeIn);
          animating = false;

        });
      });

  });
}


function onlyRevert(revertId, fromList, nextBranch) {
  animating = true;
  var factor = parseInt(revertId[1]);
  var toLeft = "" + (factors[pages.indexOf(eventId)] * (factor-1)).toString() + "px";
  $(branchevent + " #" + revertId).children('.eventdescription').fadeOut('fast');

  $(branchevent + " #" + revertId).children('.bottompanel').fadeOut('fast');
  $(branchevent + " #" + revertId).children('span').fadeOut('fast', function() {
    $(branchevent + " #" + revertId).animate({
      width:  factors[pages.indexOf(currentPage)] - subtracts[pages.indexOf(currentPage)],
      marginLeft: toLeft,
      backgroundColor: 'rgba(255, 255, 255, 1)'},
      200, function() {
        $(this).animate({
          marginTop: '0px', height: '80px'},
          400, "easeOutCubic", function() {
            $(branchevent + " #" + revertId).children('.eventname').css({ 'margin-top': topMargins[pages.indexOf(currentPage)][factor-1] });
            $(this).children('span').fadeIn('slow', function(){
              activeId = "l1";
              $('div').clearQueue();
              $('div').finish();
              $('div').stop();
            }).promise().done(
              function() {
                for (var i = 1; i <= 9; i++) {

                    $(branchevent + " #l" + i).css({'display':'block'});
                    $(branchevent + " #l" + i).animate({
                      top: '-350px'},
                      500 + 100*(i));
                    if ($(branchevent + " #l" + i).attr('id') == undefined) {
                      break;
                    }
                  }
                  $('div').clearQueue();
                  if (!fromList) {
                    fadeThemOut();
                  }
                  else {
                    startEntryFromBranch(nextBranch);
                  }
              });
        });
    });
  });
}

function changeBackground() {
  if (currentImage + 2 > images.length-1) {
    currentImage = 0;
  }
  displayImage =  images[currentImage];
  nextDisplayImage = images[currentImage + 1];
  if (currentBackground == 0) {
    otherBackground = '.backgroundimage1';
    $('.backgroundimage1').css({
      'background-image': "url('images/" + nextDisplayImage + "')",
    });
    $('.backgroundimage').fadeOut('slow', function() {

      $(this).css({
        'background-image': "url('images/" + displayImage + "')"
      });
      $('.backgroundimage1').fadeIn('slow', function() {
        $(this).css({
          'z-index': '-14'
        });
        $('.backgroundimage').css({
          'z-index': '-15',
          'display': "inline"
        });
      });

    });
    currentBackground = 1;
  }
  else {
    otherBackground = '.backgroundimage';
    $('.backgroundimage').css({
      'background-image': "url('images/" + nextDisplayImage + "')"
    });
    $('.backgroundimage1').fadeOut('slow', function() {

      $(this).css({
        'background-image': "url('images/" + displayImage + "')"
      });
      $('.backgroundimage').fadeIn('slow', function() {
        $(this).css({
          'z-index': '-14'
        });
        $('.backgroundimage1').css({
          'z-index': '-15',
          'display': "inline"
        });
      });

    });
    currentBackground = 0;
  }
  currentImage++;
}

function setHeight() {

  if(true) {
    $(".righthalf").height($(window).height());
    $(".lefthalf").height($(window).height());
    $(".overlay").height($(window).height());
    $(".backgroundimage").height($(window).height());
    $(".backgroundimage1").height($(window).height());
  }
  else {
    $(".righthalf").height($(window).height() + 100);
  }
}

function respond(value) {
  var windowWidth = parseInt($(window).width());

  setHeight();
  if (windowWidth < 1219 || windowWidth > 640){
    mobileDevice = true;
    makemobile(value);
  }
  var socialLeft = ((((42.5 * windowWidth) / 100)) - 250)/2 - 40;
  $(".socialbuttons").css({
    'left': socialLeft
  });

  $(".socialaddress").css({
    'left': socialLeft + 50
  });

}

/*
function doOnOrientationChange() {
  $('.backgroundimage').height($(window).height() + 60);
  $('.backgroundimage1').height($(window).height() + 60);
  switch(window.orientation)
  {
    case -90:
      $('.backgroundimage').height($(window).height() + 60);
      $('.backgroundimage1').height($(window).height() + 60);
      $(".righthalf").height($(window).height() + 100);
      alert("-90");
      break;
    case 90:
      alert('landscape');
      $('.backgroundimage').height($(window).height() + 60);
      $('.backgroundimage1').height($(window).height() + 60);
      $(".righthalf").height($(window).height() + 100);
      alert("90");
      break;
    default:
      alert('portrait');
      break;
  }
}*/

//window.addEventListener('orientationchange', doOnOrientationChange);

$(function() {
  for(keyElement in keyElements) {
    $(keyElements[keyElement]).swipe( {
      swipeRight:openNav, swipeLeft:closeNav, threshold:80
    });
  }
});

$(function() {
  for(keyElement in keyElements) {
    if (keyElements[keyElement] != ".navdrawer") {
      $(keyElements[keyElement]).click(function(event) {
        closeNav();
      });
    }

  }
});
function openNav() {
  $(".navdrawer").animate({
    'left': '0'},
    200, 'easeOutCubic', function() {
      navactive = true;
  });
  $(".drawericonholder").animate({
    'left': '60%'},
    200, 'easeOutCubic', function() {
      navactive = true;
  });
  if (!fromBranch) {
    $('.hamburger').fadeOut('fast', function() {
      $('.hamburger').css({ 'background-image': 'url("images/close.png")' });
      $('.hamburger').fadeIn(200);
    });
  }
}
function closeNav() {
  if (navactive) {
    $(".navdrawer").animate({
      'left': '-60%'},
      200, 'easeOutCubic', function() {
        navactive = false;
    });
    $(".drawericonholder").animate({
      'left': '0'},
      200, 'easeOutCubic', function() {
        navactive = false;
    });
    if (!fromBranch) {
      $('.hamburger').fadeOut('fast', function() {
        $('.hamburger').css({ 'background-image': 'url("images/menu.png")' });
        $('.hamburger').fadeIn(200);
      });
    }
  }
}
function makemobile(value) {
  if (value != 1 || value === 2) {
    $('.backgroundimage').height($(window).height() + 60);
    $('.backgroundimage1').height($(window).height() + 60);
    $(".overlay").height($(window).height() + 60);
    $('.navdrawer').height($(window).height() + 60);
    $('.drawericonholder').css({
      'top': $(window).height() * 0.6
    });
  }
}
$(document).keydown(function(event) {
  if (($(".lefthalf").height()) > (($(window).height()))) {
    setHeight();
  }
  setTimeout(function(){
      setHeight();
  }, 200);
  e = jQuery.Event("keydown");
  e.which = 65;
  if (($(".lefthalf").height()) > (($(window).height()))) {
    setHeight();
  }
});
function selectFromList() {
  $('.topimage').unbind('click', closeHomeIn);
  animating = true;
  popitdown();
  setTimeout(function() {closeBranches();}, 100);
  nexteventId = $(this).attr('value');
  nextBranch = '.' + $(this).attr('value') + 'events';
  onlyRevert(activeId, true, nextBranch);
}
function startEntryFromBranch(nextBranch) {
  if (!goingBack) {
    if (pageStack[pageStack.length - 1] != currentPage) {
      pageStack.push(currentPage);
    }
    goingBack = false;
  }
  animating = true;
  var reachedEnd = false;
  var time = 0;
  $(nextBranch).html(pagesGot[pages.indexOf(nexteventId)]);
  setHandlers();
  $('.events').unbind('click', eventClicked);
  document.title = branchTitles[pages.indexOf(nexteventId)];
  $(nextBranch).fadeIn('fast');
  for (var i = 1; i <= 9; i++) {
    $(nextBranch + " #l" + i).animate({top: '50px'}, 500 + 100*i);
    if (registeredEventIds.indexOf(nextBranch + " #l" + i) >= 0) {
      $(nextBranch + " #l" + i + " .switch").prop('checked', true);
      $(nextBranch + " #l" + i + " .switch").parent().children('.mark').html("This event has been marked.");
      $(nextBranch + " #l" + i + " .forff").css({'left':'30px'});
    }
    if ($(nextBranch + " #l" + i).attr('id') == undefined) {
      reachedEnd = true;
      time = 500 + 100*i;
      break;
    }
  }
  $('div').clearQueue();
  var branch = branchNames[pages.indexOf(nexteventId)]
  $('.branchlisttop').children('span').html(branch);
  $('.branchlisttop').children('ul').children('#' + eventId + 'select').css({'display':'block'});
  $('.branchlisttop').children('ul').children('#' + nexteventId + 'select').css({'display':'none'});
  eventId = nexteventId;
  currentPage = nexteventId;
  $('div').clearQueue();
  setTimeout(function() {expandFirst(nextBranch);}, 1100);
}
function goBack() {
  if (pageStack.length >= 1) {
    //Custom comebacks
    var previousPage = pageStack.pop();
    goingBack = true;
    if (currentPage != "home") {
      previousBranch = '.' + previousPage + 'events';
      nexteventId = previousPage;
      forwardStack.push(currentPage);
      if (previousPage != "home") {
        onlyRevert(activeId, true, previousBranch);
      }
      else {
        closeHomeIn(true);
        goingBack = true;
      }
    }
    else {
      $('.topimage').unbind('click', closeHomeIn);
      openHome(previousPage);
      document.title = branchTitles[pages.indexOf(currentPage)];
    }
  }
  else {
    history.go(-2);
  }
}
function register() {
  var validCount = 0;
  mobile = "No";
  name = $("#name").val();
  email = $("#email").val();
  college = $("#college").val();
  rollnum = $("#rollno").val();
  year = $("#year").children('span').html();
  branch = $("#branch").children('span').html();
  phonenum = $("#phno").val();
  allEvents = "";
  eventCodes = JSON.stringify(markedEventCodes);
  refcode = $(".refcodetext").val();
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
      cache: true,
      success: function(result) {
        if (result.indexOf("Duplicate") >= 0) {
          setTimeout(function() {alert("It appears you, or someone else, has already registered for these events with that email. Try something else.")}, 550);
        }
        else {
          successfulRegister(name);
          resetAll();
        }
      },
      error: function(result) {
      }
    });
  }
}
function successfulRegister(name) {
  if (poppedup) {
    $('.popup').children().fadeOut('fast', function() {
    });
    $('.popup').animate({
      backgroundColor: 'rgb(4, 179, 68)'},
      800, function() {
        $('.popup').append("<img class='successtick' src='images/tick.png' /> <div class='successtext'>Thank you, " + name + ", for your registration. See you soon!</div>");
        $('.successtext').fadeIn(500);
        $('.successtick').css({
          '-webkit-transform': 'rotateY(0deg)',
          '-o-transform': 'rotateY(0deg)',
          '-ms-transform': 'rotateY(0deg)',
          '-moz-transform': 'rotateY(0deg)'
        });
    });
  }
}

function resetAll() {
  for (registeredEvent in registeredEventIds) {
    $(registeredEventIds[registeredEvent] + " .switch").prop('checked', false);
    $(registeredEventIds[registeredEvent] + " .forff").animate( {'left': '-5px'}, 'fast');
    $(registeredEventIds[registeredEvent] + " .mark").html("Mark this event for registration");
  }
  $('input').val('');
} 
