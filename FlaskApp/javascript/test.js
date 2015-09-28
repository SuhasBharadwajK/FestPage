/***

TODO The loading screen doesn't show up in smaller screens
MAJOR TODO!! Firefuckingfox doesn't support background-image transitions!!!!

***/
var images = Array("pic.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg", "pic6.jpg", "pic7.jpg", "background.jpg", "pic.jpg");
var currentImage = 0;
var currentBackground = 0;

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
  if($(window).width() >= 1280) {
    doneLoading();
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
              $("#clogo").fadeIn('slow');
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
          $("#faceit").fadeTo('fast', 0.5, function() {
            $(this).fadeTo('fast', 1);
          });
          $("#cse").fadeTo('fast', 0.5, function() {
            $(this).fadeTo('fast', 1, function() {
              $(this).animate({
                left: "+=18px",
                top: "+=32px"
                },
                800);
              });
          });
          $("#ece").fadeTo('fast', 0.5, function() {
            $(this).fadeTo('fast', 1, function() {
              $(this).animate({
                left: "-=18px",
                top: "+=32px"
                },
                800);
              });
          });
          $("#mech").fadeTo('fast', 0.5, function() {
            $(this).fadeTo('fast', 1, function() {
              $(this).animate({
                left: "+=20px"
                },
                800);
              });
          });
          $("#civ").fadeTo('fast', 0.5, function() {
            $(this).fadeTo('fast', 1, function() {
              $(this).animate({
                left: "-=20px"
                },
                800);
              });
          });
          $("#it").fadeTo('fast', 0.5, function() {
            $(this).fadeTo('fast', 1, function() {
              $(this).animate({
                left: "+=20px",
                top: "-=20px"
                },
                800);
              });
          });
          $("#eee").fadeTo('fast', 0.5, function() {
            $(this).fadeTo('fast', 1, function() {
              $(this).animate({
                left: "-=20px",
                top: "-=20px"
                },
                800);
              });
          });
        });
      // $('.socialbuttons').animate({
      //   bottom: "+=60px"
      // },
      //   "400", function() {
      //   /* stuff to do after animation is complete */
      // });
      // $('.socialaddress').animate({
      //   bottom: '+=85px'
      // },
      //   '400', function() {
      //   /* stuff to do after animation is complete */
      // });
    });

}

// $(window).load(function() {
//   /* Act on the event */
//   $(".loadingoverlay").fadeOut('slow', function() {
//
//   });
// });

function doneMobileLoading() {
  $("#loadingoverlay").fadeOut('slow', function() {});
}

$(document).load(function() {
  /* Act on the event */
  //respond();
});
$(document).ready(function() {


  if (window.history && window.history.pushState) {

    //TODO: Back button handler
  //  $(window).on('popstate', function() {
  //    var hashLocation = location.hash;
  //    var hashSplit = hashLocation.split("#!/");
  //    var hashName = hashSplit[1];
   //
  //    if (hashName !== '') {
  //      var hash = window.location.hash;
  //      if (hash === '') {
  //        alert('Back button was pressed.');
  //      }
  //    }
  //  });
  //TODO: Another back button thing
  //window.history.pushState('forward', null, './#suhas');
 }

  //$(".lefthalf").height($(window).height());
  //$(".righthalf").height($(window).height());
  //makemobile()
  respond();



  $(window).ready(function() {
    /* Act on the event */
    //respond();
  });


  //mobileit();
  //respond();
  setHeight();

  console.log("Ready!");
  // var heightof = $(window).height();
  // console.log(heightof);
  // var left = document.getElementById('left');
  // left.height(heightof);
  // console.log(typeof $(window).height());
  $(window).resize(function(event) {
    /* Act on the event */
    respond();
  });

  // $(window).click(function(event) {
  //   /* Act on the event */
  //   setHeight();
  //   respond();
  //   console.log("Clicked!");
  //
  // });
  setTimeout(function(){$(window).trigger('click');} , 100);

  /**** TODO Without this, the elements in the smaller screens are fucked up for some reason  ****/
  setTimeout(function(){$(window).trigger('resize');} , 100);

  setInterval(changeBackground, 3500);


  $(".socialbutton").hover(function() {
    /* Stuff to do when the mouse enters the element */
    var id = $(this).attr("id");
    //console.log(id);
    $(this).find('img').fadeOut('fast', function() {
      $(this).attr('src', 'images/' + id + '.png');
      $(this).fadeIn('fast');
    });

    }, function() {
    /* Stuff to do when the mouse leaves the element */
      var id = $(this).attr("id");
      $(this).find('img').fadeOut('fast', function() {
        $(this).attr('src', 'images/' + id + 'white.png');
        $(this).fadeIn('fast');
    });
  });
});


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

  //$(".righthalf").css({"background-image":"url('images/" + displayImage + "')"});
  currentImage++;
}

function setHeight() {
  $(".lefthalf").height($(window).height());
  $(".righthalf").height($(window).height());
}

function respond() {
  var windowWidth = parseInt($(window).width());
  //alert(windowWidth);
  if (windowWidth >= 1920) {
    $("#responsive").attr("href", "css/homestyles1920.css");
    console.log("1600");
  }
  else if (windowWidth >= 1600) {
    $("#responsive").attr("href", "css/homestyles1600.css");
    console.log("1600");
  }
  else if (windowWidth >= 1366) {
    $("#responsive").attr("href", "css/homestyles1366.css");
    console.log(windowWidth);
  }
  else if (windowWidth >= 1280) {
    $("#responsive").attr("href", "css/homestyles1280.css");
    console.log(windowWidth);
  }
  else if (windowWidth > 640) {
    //$("#responsive").attr("href", "css/homestyles1280.css");
    $("#responsive").attr("href", "css/homestylesmobile.css");
    console.log(windowWidth);
    makemobile();
  }
  else if (windowWidth <= 640){
    $("#responsive").attr("href", "css/homestylesmobile.css");
    console.log(windowWidth);
    makemobile();
    //$(window).trigger('click');


    //$("#jssource").attr("src", "javascript/homemobilescript.js");
    //console.log("Mobile!");
    //alert("HO");

  }

  // $('.righthalf').css({
  //   "background-image": "url('images/background.jpg')",
  //   "background-position": "right"
  //   //property2: 'value2'
  // });

  setHeight();

  var socialLeft = ((((42.5 * windowWidth) / 100)) - 250)/2 - 40;
  //socialLeft = socialLeft + "";
  //console.log(socialLeft);
  $(".socialbuttons").css({
    'left': socialLeft
  });

  $(".socialaddress").css({
    'left': socialLeft + 50
  });

}

function makemobile() {
  $(".righthalf").children().append($('.lefthalf').children());

  $('.hexagon').remove();
  $('.hexagon1').remove();
  $('.hexagon2').remove();
  $('.hexagon-container').remove();
  $(".lefthalf").remove();

  $(".secondLine").css({
    'left': ($(window).width() - $(".secondLine").children('span').width())/2 - 80
  });

  console.log("College width");
  console.log($(".secondLine").children('span').width());
  console.log(($(window).width() - $(".secondLine").children('span').width())/2);

  $(".firstLine").css({
    'left': ($(window).width() - $(this).children('span').width())/2 - 300
  });

  presentsWidth = $(".presents").children('span').width();
  console.log($(window).width());
  presentsLeft = ($(window).width() - presentsWidth)/2;
  console.log(presentsWidth);
  console.log(presentsLeft);
  $(".presents").css({
    'left': presentsLeft
  });

  $(".socialaddress").html("");

  console.log("Logo");
  console.log(($(window).width() - $("#flogo").width())/2);

  $("#flogo").css({
    'left': ($(window).width() - $("#flogo").width())/2 - 10
  });

  $("#clogo").css({
    'width': '10%'
  });

  if ($(window).width() ) {

  }
  // $('.presents').animate({
  //   'left': presentsLeft
  // },
  //   'slow', function() {
  //   /* stuff to do after animation is complete */
  //   // $(".presents").css({
  //   //   'left': presentsLeft
  //   // });
  // });
  // $(".presents").click(function(event) {
  //   $(this).animate({
  //     'left': presentsLeft
  //   },
  //     'slow', function() {
  //     /* stuff to do after animation is complete */
  //     // $(".presents").css({
  //     //   'left': presentsLeft
  //     // });
  //   });
  // });
  // $(".presents").css({
  //   'left': presentsLeft
  // });
  //
}

// setTimeout(function(){
//     //do what you need here
//     //alert("Timed out!");
// }, 200);

$(document).change(function(event) {
  /* Act on the event */
  //respond();
});

//window.onbeforeunload = function() { alert("You work will be lost."); };

$(document).keydown(function(event) {
  if (($(".lefthalf").height()) > (($(window).height()))) {
    setHeight();
  }
  //respond();
  if (event.which == 116) {
    //respond();
    //alert("Reload?!");
  }
  console.log(event.which);
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
