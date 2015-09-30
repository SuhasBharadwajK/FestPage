//console.log("Aspect ratio: " + $(window).width()/$(window).height());

/***

TODO The loading screen doesn't show up in smaller screens
MAJOR TODO!! Firefuckingfox doesn't support background-image transitions!!!!  - Done. Fuck you Firefox.

MAJOR TODO: Check the expanding after going back from closed home

***/
var images = Array("pic.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg", "pic6.jpg", "pic7.jpg", "background.jpg", "pic.jpg");
var imagesGot = Array();
var pagesGot = Array();
var keyElements = Array(".overlay", ".firstLine", ".secondLine", ".presents", "#flogo", ".navdrawer");
var elementsNumber = 8;
var currentPage = "home";
var pages = Array("cse", "ece", "mech", "civ", "eee", "it");
var branchNames = Array("CSE", "ECE", "MECH", "CIVIL", "EEE", "IT");
var festTitle = "fACEit 2k15 - A National Level Technical Symposium";
var branchTitles = [["Department of Computer Science and Engineering"],
                    ["Department of Electronics and Communication Engineering"],
                    ["Department of Mechanical Engineering"],
                    ["Department of Civil Engineering"],
                    ["Department of Electrical and Electronics Engineering"],
                    ["Deparment of Information Technology"]];
var activeIds = Array("l1", "l1", "l1", "l1", "l1", "l1");
var currentIds = Array("", "", "", "", "", "");
var pageStack = Array();
var forwardStack = Array();
var currentImage = 0;
var currentBackground = 0, otherBackground = "";
var lastPage = "";
var mobileDevice = false, navactive = false;
var $dragging = null;
var initialAspectRatio = $(window).width() / $(window).height();
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
  // imageCount = 0;
  // for (var i = 0; i < images.length; i++) {
  //   $.ajax({
  //     url: 'images/' + images[i],
  //     type: 'GET',
  //     success: function(response) {
  //       imagesGot.push(response);
  //       imageCount++;
  //       if (imageCount == images.length) {
  //
  //
  //       }
  //     }
  //   });
  //
  // }
  if($(window).width() > 1219) {
    fileCount = 0;
    for (var i = 0; i < pages.length; i++) {
      $.ajax({
        url: 'pages/' + pages[i] + '.html',
        type: 'GET',
        cache: false,
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
    doneMobileLoading();
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
            700, function() {
              //$("#clogo").fadeIn('slow');
            });

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
            $("#centerlogo").fadeTo('fast', 0.6, function() {
              // $(this).fadeTo('fast', 0.6);
            });


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
                800);
              });


          });


        });
    });

}

function doneMobileLoading() {
  $("#loadingoverlay").fadeOut('slow', function() {
    $('.socialbuttons').animate({
            bottom: '+=60px'},
            "fast", function() {
            /* stuff to do after animation is complete */
          });
    /*TODO Animations for mobile. Most mobiles lag because of this.*/
    // $(".firstLine").fadeIn(500, function() {
    //
    // });
    // $(".righthalf #clogo").fadeIn(500, function() {
    //
    // });
    // $(".righthalf .secondLine").fadeIn(500, function() {
    //
    //   $(".righthalf .presents").fadeIn(800, function() {
    //
    //     $('.hamburger').animate({
    //       'right': '+=70'}, 600);
    //
    //     $(".righthalf #flogo").fadeIn(500, function() {
    //       $('.socialbuttons').animate({
    //         bottom: '+=60px'},
    //         "fast", function() {
    //         /* stuff to do after animation is complete */
    //       });
    //
    //     });
    //
    //   });
    //
    // });

  });

}

$(document).load(function() {
  //respond();
});


window.onbeforeunload = function() {
  //return "Are you sure?";
 };

window.onload = function () {
    if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
            history.pushState('newjibberish', null, null);
            //alert("Backed up!");
            if (!animating) {
              console.log("Going Back!");
              goBack();
            }
            //animating = true;
            // Handle the back (or forward) buttons here
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
/*
--------------------------------------------------------------------------------------------------------------------
Document READY!!!
--------------------------------------------------------------------------------------------------------------------
*/
$(document).ready(function() {

  respond();

  setHeight();

  console.log("Ready!");

  $(window).keydown(function(event) {
    if (event.keyCode == 9) {
      if ($('.group').children('input').is(":focus")) {
        return true;
      }
      else {
        event.preventDefault();
      }
    }
  });

  // $('.popup').keydown(function(event) {
  //   if (event.keyCode == 9) {
  //     return true;
  //   }
  // });

  $('.hexagon').click(function(event) {
    animating = true;
    //openBranch();
    console.log("Pushing into stack..................................................................");
    $('.topimage').unbind('click', closeHomeIn);
    event.preventDefault();
    eventId = $(this).attr("id");
    console.log("Bloody hell " + eventId);
    if (eventId != "faceit") {
      if (pageStack[pageStack.length - 1] != currentPage) {
        pageStack.push(currentPage);
      }
      if (eventId == "it") {
        //eventId = "cse";
        currentPage = "it";
      }
      else {
        currentPage = eventId;
      }
      document.title = branchTitles[pages.indexOf(currentPage)];
      console.log("-------------------TITLE " + document.title);
      // if (currentPage != "home") {
      //   pageStack.push(currentPage);
      // }
      lastPage = pageStack[pageStack.length - 1];
      $('.' + currentPage +'events').html(pagesGot[pages.indexOf(currentPage)]);
      console.log('These events .' + eventId +'events');
      setHandlers();
      $('.events').unbind('click', eventClicked);
      // var client = new XMLHttpRequest();
      // client.open('GET', '/pages/' + eventId);
      // client.onreadystatechange = function() {
      //   //console.log(client.responseText);
      //   $('.' + currentPage +'events').html(client.responseText);
      //   console.log('These events .' + eventId +'events');
      //   setHandlers();
      //   $('.events').unbind('click', eventClicked);
      // }
      // client.send();
    }
    //alert($(this).attr("id").toUpperCase());
    if (eventId != "faceit") {

      //$('.events').unbind('click', eventClicked);
      var branch = $(this).children('.hexagon1').children('.hexagon2').children('a').html();
      event.preventDefault();
      $('.branchlisttop').children('span').html(branch);
      $('.branchlisttop').children('ul').children('#' + eventId + 'select').css({'display':'none'});
      if (currentPage != "home") {
        var eventnum = "";
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
    //console.log("resizing");
    respond();
  });

  $(document).on('keydown', function(event) {
    if (event.which == 9 || event.keyCode == 9) {
      preventDefault();
    }
  });

  setTimeout(function(){$(window).trigger('click');} , 100);

  /**** TODO Without this, the elements in the smaller screens are fucked up for some reason  ****/
  //setTimeout(function(){$(window).trigger('resize');} , 100);

  backgroundChange = setInterval(changeBackground, 3500);


  $(".socialbutton").hover(function() {
    var id = $(this).attr("id");
    //console.log(id);
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

});

function openBranch() {
  //clearInterval(backgroundChange);
  //$(otherBackground).css({'display':'none'});
}

function startEntry(page, num) {
  animating = true;

  var branchevent = "." + page + "events";
  if (page != "home") {
      $('body').animate({
        backgroundColor: 'rgb(224, 83, 58);'
        },
        'slow', function() {
          //$(".cseevents").fadeIn('fast');
          $(branchevent).fadeIn('fast');
          for (var i = 1; i <= 9; i++) {
            console.log(branchevent);
            $(branchevent + " #l" + i).animate({
              top: '50px'},
              500 + 100*i, function () {
                if (registeredEventIds.indexOf(branchevent + " #l" + i) >= 0) {
                  console.log('Already registered!' + branchevent + " #l" + i + " .switch" + '---------.....................----------------');
                  $(branchevent + " #l" + i + " .switch").prop('checked', true);
                  $(branchevent + " #l" + i + " .forff").css({'left':'30px'});
                  $(branchevent + " #l" + i + " .switch").parent().children('.mark').html("This event has been marked.");
                  //$(branchevent + " #l" + i + " .mark").html("This event has been marked.")
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
  console.log("-------------------TITLE " + document.title);
  $('.topimage').unbind('click', closeHomeIn);
  animating = true;
  //eventPage = false;
  //goingBack = backStatus;
  if (!goingBack && pageStack[pageStack.length - 1] != currentPage) {
    console.log("Pushing into stack..................................................................");
    if (pageStack[pageStack.length - 1] != currentPage) {
      pageStack.push(currentPage);
    }
    goingBack = false;
  }
  else {
    console.log(goingBack);
    console.log(".............................NOT PUSHING..............................................");
  }
  $('.topimage').unbind('click', closeHomeIn);
  closeBranches();
  //eventPage = false;
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
  //openBranch();
  // console.log("Pushing into stack..................................................................");
  // pageStack.push(currentPage);
  $('.topimage').unbind('click', closeHomeIn);
  $('.events').unbind('click', eventClicked);
  //event.preventDefault();

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
      // $(this).fadeOut('fast', function() {
      //
      // });
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
  //eventPage = false;
  animating = true;
  console.log("currentPage: " + eventId);
  // $("." + currentPage + "events").fadeOut('slow', function() {
  //   $(this).children('.events').css({top: '1150px'});
  // });
  $('.topbar').fadeOut('slow', function() {
  });
  $('body').animate({
    backgroundColor: 'black'},
    'slow', function() {
      //lefthalf, righthalf, backgroundimage, backgroundimage1, social
      $('.lefthalf').fadeIn('fast', function() {
        $(this).animate({
          marginLeft: '0'},
          800, 'easeOutCubic', function() {
          /* stuff to do after animation is complete */
        });
      });
      $('.righthalf').fadeIn('fast', function() {
        $(this).animate({
          marginRight: '0'},
          900, 'easeOutCubic', function() {
          /* stuff to do after animation is complete */
        });
      });
      $('.backgroundimage').animate({
        right: '0px'},
        900, 'easeOutCubic', function() {

      });
      $('.backgroundimage1').animate({
        right: '0px'},
        900, 'easeOutCubic', function() {

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
  console.log("Only rever called!");
  var factor = parseInt(revertId[1]);
  //alert(pages.indexOf(currentPage) + "," + topMargins[pages.indexOf(currentPage)][factor-1]);
  var toLeft = "" + (factors[pages.indexOf(eventId)] * (factor-1)).toString() + "px";
  var imageUrl = eventImages[factor-1];
  $(branchevent + " #" + revertId).children('.eventdescription').fadeOut('fast');
  // console.log(imageUrl);
  // console.log(factor);

  //reversing(revertId);

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
                    //$(branchevent + " #" + revertId).finish();
                    //console.log(branchevent);
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
                    //animating = false;
                  }
                  else {
                    startEntryFromBranch(nextBranch);
                    //animating = false;
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
      // $('.backgroundimage1').css({
      //   'opacity': 0
      // });
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
      // $('.backgroundimage').css({
      //   'opacity': 0
      // });
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

  //if(parseInt($(window).width()) >= 1200) {
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
  //alert(windowWidth);
  if (windowWidth >= 1920) {
    setHeight();
    makedesktop();
    //$("#responsive").attr("href", "css/homestyles1920.css");
    console.log("1600");
  }
  else if (windowWidth >= 1600) {
    setHeight();
    makedesktop();
    //$("#responsive").attr("href", "css/home.css");
    console.log("1600");
  }
  else if (windowWidth >= 1300) {
    setHeight();
    makedesktop();
    //$("#responsive").attr("href", "css/homestyles1366.css");
    console.log(windowWidth);
  }
  else if (windowWidth >= 1220) {
    setHeight();
    //$("#responsive").attr("href", "css/homestyles1280.css");
    //makedesktop();
    console.log(windowWidth);
  }
  else if (windowWidth < 1219 || windowWidth > 640){
    //$("#responsive").attr("href", "css/homestylesmobile.css");
    mobileDevice = true;
    console.log("GOTCHA!" + windowWidth);
    makemobile(value);
  }
  else {
    console.log("Nothing here.");
  }


  // if (windowWidth >= 1200) {
  if (true) {
    var socialLeft = ((((42.5 * windowWidth) / 100)) - 250)/2 - 40;
    $(".socialbuttons").css({
      'left': socialLeft
    });

    $(".socialaddress").css({
      'left': socialLeft + 50
    });
  }

}

function doOnOrientationChange() {
  // $('.backgroundimage').height($(window).height() + 60);
  // $('.backgroundimage1').height($(window).height() + 60);
  switch(window.orientation)
  {
    case -90:
      // $('.backgroundimage').height($(window).height() + 60);
      // $('.backgroundimage1').height($(window).height() + 60);
      // $(".righthalf").height($(window).height() + 100);
      //alert("-90");
      break;
    case 90:
      //alert('landscape');
      // $('.backgroundimage').height($(window).height() + 60);
      // $('.backgroundimage1').height($(window).height() + 60);
      // $(".righthalf").height($(window).height() + 100);
      //alert("90");
      break;
    default:
      //alert('portrait');
      break;
  }
}

window.addEventListener('orientationchange', doOnOrientationChange);

$(function() {
  for(keyElement in keyElements) {
    console.log("Key:" + keyElements[keyElement]);
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
  $('.hamburger').fadeOut('fast', function() {
    $('.hamburger').css({ 'background-image': 'url("images/close.png")' });
    $('.hamburger').fadeIn(200);
  });
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
    $('.hamburger').fadeOut('fast', function() {
      $('.hamburger').css({ 'background-image': 'url("images/menu.png")' });
      $('.hamburger').fadeIn(200);
    });
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

  console.log($(".secondLine").children('span').width());
  console.log("Second Width! " + ($(window).width() - $(".secondLine").children('span').width())/2);
}


function makedesktop() {
  // if (left == $('.lefthalf')) {
  //   var toAdd = '<div class="lefthalf half" id="left" tabindex="-1">' + left + '</div>'
  //   $('.body').children('container').append(toAdd);
  //   left = undefined;
  //   alert('msg');
  // }
  //location.reload();
}

$(document).change(function(event) {
  /* Act on the event */
  //respond();
});

$(document).keydown(function(event) {

  if (($(".lefthalf").height()) > (($(window).height()))) {
    setHeight();
  }
  //respond();
  if (event.which == 123) {
    //respond();
  }
  //console.log(event.which);
  setTimeout(function(){
      //do what you need here
      //alert("Timed out!");
      setHeight();
  }, 200);
  e = jQuery.Event("keydown");
  e.which = 65;
  //if(flag == "Stop") {$(document).trigger(e, "Stop" );}
  //console.log($(".lefthalf").height());
  //console.log($(window).height());
  if (($(".lefthalf").height()) > (($(window).height()))) {
    setHeight();
  }

});

function selectFromList() {
  animating = true;
  popitdown();
  setTimeout(function() {closeBranches();}, 100);

  nexteventId = $(this).attr('value');

  //alert($(this).attr('value'));
  nextBranch = '.' + $(this).attr('value') + 'events';
  onlyRevert(activeId, true, nextBranch);
  // $(branchevent).fadeIn('fast');
  // for (var i = 1; i <= 8; i++) {
  //   //console.log(branchevent);
  //   $(branchevent + " #l" + i).animate({
  //     top: '50px'},
  //     500 + 100*i);
  // }
  // //startEntry($(this).attr('value'), 1);
  //animating = false;
}

function startEntryFromBranch(nextBranch) {
  if (!animating) {

  }
  animating = true;
  var reachedEnd = false;
  var time = 0;
  $(nextBranch).html(pagesGot[pages.indexOf(nexteventId)]);
  console.log('These events .' + nexteventId +'events');
  setHandlers();
  $('.events').unbind('click', eventClicked);
  document.title = branchTitles[pages.indexOf(nexteventId)];
  console.log("-------------------TITLE " + document.title);

  $(nextBranch).fadeIn('fast');

  for (var i = 1; i <= 9; i++) {
    //console.log(branchevent);
    $(nextBranch + " #l" + i).animate({top: '50px'}, 500 + 100*i);
    console.log("IDs in loop: " + $(nextBranch + " #l" + i).attr('id'));
    if (registeredEventIds.indexOf(nextBranch + " #l" + i) >= 0) {
      console.log('Already registered!' + branchevent + " #l" + i + " .switch" + '---------.....................----------------');
      $(nextBranch + " #l" + i + " .switch").prop('checked', true);
      $(nextBranch + " #l" + i + " .switch").parent().children('.mark').html("This event has been marked.");
      $(nextBranch + " #l" + i + " .forff").css({'left':'30px'});
      //$(branchevent + " #l" + i + " .mark").html("This event has been marked.")
    }
    if ($(nextBranch + " #l" + i).attr('id') == undefined) {
      reachedEnd = true;
      // animating = false;
      time = 500 + 100*i;
      break;
    }
  }
  $('div').clearQueue();
  //checkUntilEnd = setInterval(function(){}, )

  var branch = branchNames[pages.indexOf(nexteventId)]
  $('.branchlisttop').children('span').html(branch);
  $('.branchlisttop').children('ul').children('#' + eventId + 'select').css({'display':'block'});
  $('.branchlisttop').children('ul').children('#' + nexteventId + 'select').css({'display':'none'});

  eventId = nexteventId;
  currentPage = nexteventId;
  // var client = new XMLHttpRequest();
  // client.open('GET', '/pages/' + nexteventId);
  // client.onreadystatechange = function() {
  //   //console.log(client.responseText);
  //   // $(nextBranch).html(client.responseText);
  //   // console.log('These events .' + nexteventId +'events');
  //   // setHandlers();
  //   // $('.events').unbind('click', eventClicked);
  //   // document.title = branchTitles[pages.indexOf(nexteventId)];
  //   // console.log("-------------------TITLE " + document.title);
  //   // $(nextBranch).fadeIn('fast');
  //   //
  //   // for (var i = 1; i <= 9; i++) {
  //   //   //console.log(branchevent);
  //   //   $(nextBranch + " #l" + i).animate({top: '50px'}, 500 + 100*i);
  //   //   console.log("IDs in loop: " + $(nextBranch + " #l" + i).attr('id'));
  //   //   if (registeredEventIds.indexOf(nextBranch + " #l" + i) >= 0) {
  //   //     console.log('Already registered!' + branchevent + " #l" + i + " .switch" + '---------.....................----------------');
  //   //     $(nextBranch + " #l" + i + " .switch").prop('checked', true);
  //   //     $(nextBranch + " #l" + i + " .switch").parent().children('.mark').html("This event has been marked.");
  //   //     $(nextBranch + " #l" + i + " .forff").css({'left':'30px'});
  //   //     //$(branchevent + " #l" + i + " .mark").html("This event has been marked.")
  //   //   }
  //   //   if ($(nextBranch + " #l" + i).attr('id') == undefined) {
  //   //     reachedEnd = true;
  //   //     // animating = false;
  //   //     time = 500 + 100*i;
  //   //     break;
  //   //   }
  //   // }
  //   // $('div').clearQueue();
  //   // //checkUntilEnd = setInterval(function(){}, )
  //   //
  //   // var branch = branchNames[pages.indexOf(nexteventId)]
  //   // $('.branchlisttop').children('span').html(branch);
  //   // $('.branchlisttop').children('ul').children('#' + eventId + 'select').css({'display':'block'});
  //   // $('.branchlisttop').children('ul').children('#' + nexteventId + 'select').css({'display':'none'});
  //   //
  //   // eventId = nexteventId;
  //   // currentPage = nexteventId;
  //
  // }
  //client.send();

  $('div').clearQueue();
  setTimeout(function() {expandFirst(nextBranch);}, 1100);

  // var branch = branchNames[pages.indexOf(nexteventId)]
  // event.preventDefault();
  // //currentPage = $(this).children('.hexagon1').children('.hexagon2').children('a').html().toLowerCase();
  // $('.branchlisttop').children('span').html(branch);

  //currentPage = $(this).children('.hexagon1').children('.hexagon2').children('a').html().toLowerCase();
  if (!goingBack) {
    console.log("Pushing into stack..................................................................");
    if (pageStack[pageStack.length - 1] != currentPage) {
      pageStack.push(currentPage);
    }
    goingBack = false;
  }

}


function goBack() {
  console.log(pageStack);
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
        //$(previousBranch).html("");
      }
    }
    else {
      $('.topimage').unbind('click', closeHomeIn);
      openHome(previousPage);
      document.title = branchTitles[pages.indexOf(currentPage)];
      console.log("-------------------TITLE " + document.title);
      //startEntry(previousPage, 1);
    }
  }
  else {
    history.go(-2);
  }
}

function register() {
  var validCount = 0;
  //successfulRegister("Suhas");
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
  else if (!/^([A-Z]{1}[.]?[a-z]*[^!_@#$%\^\-0-9]*[\s]?)([A-Z]{1}[.]?[a-z]*[^!_@#$%\^\-0-9]*[\s]?)+$/.test(name)) {
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
        //Semi regex for proper name /^([A-Z]{1}[.]?[a-z]*[\s]?)([A-Z]{1}[.]?[a-z]*[\s]?)*$/
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
    //successfulRegister(name);
    for (anEvent in markedEvents) {
      if (anEvent == markedEvents.length - 1) {
        allEvents += markedEvents[anEvent].replace("&nbsp;", "");
      }
      else {
        allEvents += markedEvents[anEvent].replace("&nbsp;", "") + ",";
      }
    }

    dataToSend = 'name=' + name + '&email=' + email + '&college=' + college + '&rollnum=' + rollnum + '&year=' + year + '&branch=' + branch + '&phonenum=' + phonenum + '&allevents=' + allEvents + '&eventCodes=' + eventCodes + '&refcode=' + refcode;

    $.ajax({
      url: 'register.php',
      type: 'POST',
      data: dataToSend,
      cache: false,
      success: function(result) {
        //console.log(result);
        if (result.indexOf("Duplicate") >= 0) {
          setTimeout(function() {alert("It appears you, or someone else, has already registered for these events with that email. Try something else.")}, 550);
        }
        else {
          successfulRegister(name);
          console.log(result);
        }
        //successfulRegister(name);
        // console.log("The inserttion was a " + result);
        // if (result == "success") {
        //
        // }
      },
      error: function(result) {
        console.log(result);
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
