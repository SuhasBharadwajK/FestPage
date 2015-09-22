//console.log("Aspect ratio: " + $(window).width()/$(window).height());

/***

TODO The loading screen doesn't show up in smaller screens
MAJOR TODO!! Firefuckingfox doesn't support background-image transitions!!!!

***/
var images = Array("pic.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg", "pic6.jpg", "pic7.jpg", "background.jpg", "pic.jpg");
var keyElements = Array(".overlay", ".firstLine", ".secondLine", ".presents", "#flogo", ".navdrawer");
var elementsNumber = 8;
var currentPage = "home";
var pages = Array("cse", "ece", "mech", "civ", "eee", "it");
var pageStack = Array("home");
var currentImage = 0;
var currentBackground = 0;
var mobileDevice = false, navactive = false;
var $dragging = null;
var initialAspectRatio = $(window).width() / $(window).height();
var left = undefined;

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
    doneLoading();
  }
  else {
    doneMobileLoading();
    //doneLoading();
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
            //   $(this).fadeTo('fast', 1, function() {
            //
            // });
            $("#ece").fadeTo('fast', 1, function() {
              $(this).animate({
                left: "-=18px",
                top: "+=32px"
                },
                800);
              });
            //   $(this).fadeTo('fast', 1, function() {
            //
            // });
            $("#mech").fadeTo('fast', 1, function() {
              $(this).animate({
                left: "+=20px"
                },
                800);
              // $(this).fadeTo('fast', 1, function() {
              //
              //   });
            });
            $("#civ").fadeTo('fast', 1, function() {
              $(this).animate({
                left: "-=20px"
                },
                800);
              });
            //   $(this).fadeTo('fast', 1, function() {
            //
            // });
            $("#it").fadeTo('fast', 1, function() {
              $(this).animate({
                left: "+=20px",
                top: "-=20px"
                },
                800);
              });
            //   $(this).fadeTo('fast', 1, function() {
            //
            // });
            $("#eee").fadeTo('fast', 1, function() {
              $(this).animate({
                left: "-=20px",
                top: "-=20px"
                },
                800);
              });
            //   $(this).fadeTo('fast', 1, function() {
            //
            // });

          });
          //   $(this).fadeTo('fast', 1, function() {
          //
          //
          // });

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
      event.preventDefault();
    }
  });

  $('.hexagon').click(function(event) {
    event.preventDefault();
    eventId = $(this).attr("id");
    console.log("Bloody hell " + eventId);
    if (eventId != "faceit") {
      if (eventId == "it") {
        //eventId = "cse";
        currentPage = "cse";
      }
      else {
        currentPage = eventId;
      }
      var client = new XMLHttpRequest();
      client.open('GET', '/pages/' + eventId );
      client.onreadystatechange = function() {
        console.log(client.responseText);
        $('.' + currentPage +'events').html(client.responseText);
        console.log('These events .' + eventId +'events');
        setHandlers();
        $('.events').unbind('click', eventClicked);
      }
      client.send();
    }
    //alert($(this).attr("id").toUpperCase());
    if (eventId != "faceit") {

      //$('.events').unbind('click', eventClicked);
      var branch = $(this).children('.hexagon1').children('.hexagon2').children('a').html();
      event.preventDefault();
      //currentPage = $(this).children('.hexagon1').children('.hexagon2').children('a').html().toLowerCase();
      $('.branchlisttop').children('span').html(branch);

      //currentPage = $(this).children('.hexagon1').children('.hexagon2').children('a').html().toLowerCase();
      $('.branchlisttop').children('ul').children('#' + eventId + 'select').css({'display':'none'});
      pageStack.push(currentPage);
      //alert(currentPage);
      //$('.events').unbind('click', eventClicked);
      var eventnum = "";
      startEntry(currentPage, eventnum);
    }
  });

  $('#centerlogo').click(function(event) {
    window.open('http://aceec.ac.in', '_blank').location;
  });

  $(window).resize(function(event) {
    console.log("resizing");
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

  setInterval(changeBackground, 3500);


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
});



function startEntry(page, num) {
  // $.getScript( "javascript/cse1.js", function( data, textStatus, jqxhr ) {
  //   console.log( data ); // Data returned
  //   console.log( textStatus ); // Success
  //   console.log( jqxhr.status ); // 200
  //   console.log( "Load was performed." );
  // });
  var branchevent = "." + page + "events";
  if (page != "home") {
    $('.lefthalf').animate({
      marginLeft: '-=42.5%'
      },
      600, function() {
      $(this).fadeOut('fast', function() {

      });
    });
    $('.backgroundimage').animate({
      right: '-=57.5%'
      },
      800, 'easeOutCirc', function() {
        $(this).fadeOut('fast', function() {

        });
      });

    $('.social').fadeOut('fast', function() {

    });

    $('.backgroundimage1').animate({
      right: '-=57.5%'
      },
      800, 'easeOutCirc');
    $('.righthalf').animate({
      marginRight: '-=57.5%'
      },
      800, 'easeOutCirc',function() {
        $('body').animate({
          backgroundColor: 'rgb(224, 83, 58);'
        },
          'slow', function() {
            //$(".cseevents").fadeIn('fast');
            $(branchevent).fadeIn('fast');
            for (var i = 1; i <= 8; i++) {
              console.log(branchevent);
              $(branchevent + " #l" + i).animate({
                top: '50px'},
                500 + 100*i, function() {
              });
            }
            $(".topbar").fadeIn(1400, function() {

              expandFirst(branchevent);
            });

            });
        });

  }
}

function homeCloseIn() {
  //Close in homepage if clicked on home
}

function changeBackground() {
  if (currentImage + 2 > images.length-1) {
    currentImage = 0;
  }
  displayImage =  images[currentImage];
  nextDisplayImage = images[currentImage + 1];
  if (currentBackground == 0) {
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
