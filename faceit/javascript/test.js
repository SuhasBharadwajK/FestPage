/***

TODO The loading screen doesn't show up in smaller screens
MAJOR TODO!! Firefuckingfox doesn't support background-image transitions!!!!

***/
var images = Array("background.jpg","pic.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg");
var currentImage = 0;

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
        800, function() {
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
      $('.righthalf').animate({
        marginRight: '+=57.5%'
      },
        800, function() {
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

  //$(".lefthalf").height($(window).height());
  //$(".righthalf").height($(window).height());
  //makemobile()
  respond();

  // $(".righthalf").delay(1000).queue(function(){
  //               $(this).css({"background-image":"url('images/pic.jpg')"});
  // });

  // $(".righthalf").animate({
  //   opacity: 0.5
  // },
  //   'slow', function() {
  //   /* stuff to do after animation is complete */
  // });

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

  setInterval(changeBackground, 4000);


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
  if(currentImage > images.length-1) {
    currentImage = 0;
  }
  displayImage =  images[currentImage];
  $(".righthalf").css({"background-image":"url('images/" + displayImage + "')"});
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
