//console.log("Aspect ratio: " + $(window).width()/$(window).height());

/***

TODO The loading screen doesn't show up in smaller screens
MAJOR TODO!! Firefuckingfox doesn't support background-image transitions!!!!

***/
var images = Array("pic.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg", "pic6.jpg", "pic7.jpg", "background.jpg", "pic.jpg");
var keyElements = Array(".overlay", ".firstLine", ".secondLine", ".presents", "#flogo", ".navdrawer");
var currentImage = 0;
var currentBackground = 0;
var mobileDevice = false, navactive = false;
var $dragging = null;

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
          $("#faceit").fadeTo('fast', 0.5, function() {
            $(this).fadeTo('fast', 1, function() {

              $("#centerlogo").fadeTo('fast', 0.5, function() {
                $(this).fadeTo('fast', 0.6);
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
  $("#loadingoverlay").fadeOut('slow', function() {
    $(".firstLine").fadeIn(500, function() {

    });
    $("#clogo").fadeIn(500, function() {

    });
    $(".secondLine").fadeIn(500, function() {

      $(".presents").fadeIn(800, function() {

        $("#flogo").fadeIn(500, function() {
          $('.socialbuttons').animate({
            bottom: '+=60px'},
            "fast", function() {
            /* stuff to do after animation is complete */
          });
        });

      });

    });

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

  //$(".lefthalf").height($(window).height());
  //$(".righthalf").height($(window).height());
  //makemobile()
  //$('#flogo ').draggable().css("position", "absolute");

  respond();



  $(window).ready(function() {
    /* Act on the event */
    //respond();
  });


  //mobileit();
  //respond();
  setHeight();

  console.log("Ready!");

  $(window).resize(function(event) {
    respond(1);
    if (parseInt($(window).width()) >= 1280) {
      //respond();
    }
    else {
      //location.reload();
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

  if(parseInt($(window).width()) >= 1280) {
    $(".righthalf").height($(window).height());
    $(".lefthalf").height($(window).height());
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
    $("#responsive").attr("href", "css/homestyles1920.css");
    console.log("1600");
  }
  else if (windowWidth >= 1600) {
    setHeight();
    $("#responsive").attr("href", "css/homestyles1600.css");
    console.log("1600");
  }
  else if (windowWidth >= 1300) {
    setHeight();
    $("#responsive").attr("href", "css/homestyles1366.css");
    console.log(windowWidth);
  }
  else if (windowWidth >= 1280) {
    setHeight();
    $("#responsive").attr("href", "css/homestyles1280.css");

    console.log(windowWidth);
  }
  else if (windowWidth > 640) {
    $("#responsive").attr("href", "css/homestylesmobile.css");
    console.log(windowWidth);
    mobileDevice = true;
    makemobile(value);
  }
  else if (windowWidth <= 640){
    $("#responsive").attr("href", "css/homestylesmobile.css");
    mobileDevice = true;
    console.log(windowWidth);
    makemobile(value);
  }


  if (windowWidth >= 1280) {
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
      // break;
    case 90:
      //alert('landscape');
      // $('.backgroundimage').height($(window).height() + 60);
      // $('.backgroundimage1').height($(window).height() + 60);
      // $(".righthalf").height($(window).height() + 100);
      // break;
    default:
      //alert('portrait');
      break;
  }
}

window.addEventListener('orientationchange', doOnOrientationChange);

// $(function() {
//       $(".drawericon").swipe( {
//         hold:function(event, target) {
//
//           //$("#textText").html("You held the tap until the longTapthreshold was reached" );
//           $(".drawericon").swipe({
//             swipeRight:function(event, target) {
//               console.log("Holding");
//
//             }
//           });
//           alert("Held!");
//         },
//
//         threshold:5000
//       });
// });

// (function($) {
//     $.fn.drags = function(opt) {
//
//         opt = $.extend({handle:"",cursor:"move"}, opt);
//
//         if(opt.handle === "") {
//             var $el = this;
//         } else {
//             var $el = this.find(opt.handle);
//         }
//
//         return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
//             if(opt.handle === "") {
//                 var $drag = $(this).addClass('draggable');
//             } else {
//                 var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
//             }
//             var z_idx = $drag.css('z-index'),
//                 drg_h = $drag.outerHeight(),
//                 drg_w = $drag.outerWidth(),
//                 pos_y = $drag.offset().top + drg_h - e.pageY,
//                 pos_x = $drag.offset().left + drg_w - e.pageX;
//             $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
//                 $('.draggable').offset({
//                     top:e.pageY + pos_y - drg_h,
//                     left:e.pageX + pos_x - drg_w
//                 }).on("mouseup", function() {
//                     $(this).removeClass('draggable').css('z-index', z_idx);
//                 });
//             });
//             e.preventDefault(); // disable selection
//         }).on("mouseup", function() {
//             if(opt.handle === "") {
//                 $(this).removeClass('draggable');
//             } else {
//                 $(this).removeClass('active-handle').parent().removeClass('draggable');
//             }
//         });
//
//     }
// })(jQuery);

$(function() {
  $('.drawericon').mousedown(function(event) {
    if(event.which === 1) {
      var drawer = $(this);
      var left = parseInt(drawer.css('left'));
      drawer.css({'left' : left + "px"});
       var drag_start_xpos = event.clientX;
      $(window).on('mousemove', function(e) {
         var new_left = left + (e.clientX - drag_start_xpos);
         drawer.css({'left' : new_left + 'px'});

      });
      $(window).on('mouseup',function(e) {
                 if(e.which===1) {
                    $('.drawericon').removeClass('drag');
                    $(window).off('mouseup mousemove');
                 }
            });
    }
  });
})

/*$(function() {
  $(document.body).on("mousemove", function(e) {
       if ($dragging) {
           $dragging.offset({
               left: e.pageX
           });
       }
   });

   $(document.body).on("mousedown", ".drawericon", function (e) {
       $dragging = $(e.target);
   });

   $(document.body).on("mouseup", function (e) {
       $dragging = null;
   });
})*/


$(function() {
  for(keyElement in keyElements) {
    console.log(keyElements[keyElement]);
    $(keyElements[keyElement]).swipe( {
      swipeRight:openNav, swipeLeft:closeNav, threshold:10
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
  }
}



function makemobile(value) {

  if (value != 1 || value === 2) {
    $('.backgroundimage').height($(window).height() + 60);
    $('.backgroundimage1').height($(window).height() + 60);
    $('.navdrawer').height($(window).height() + 60);
    $('.drawericonholder').css({
      'top': $(window).height() * 0.6
    });
  }


  $(".secondLine span").html("");

  $(".righthalf").css({
    'height': (parseInt($(window).width()) + 100).toString() + "px"
  });
  $(".righthalf").append($('.lefthalf').children());
  //console.log("Children: " + $('.lefthalf').children());

  $('.hexagon').remove();
  $('.hexagon1').remove();
  $('.hexagon2').remove();
  $('.hexagon-container').remove();
  $(".lefthalf").remove();


  // $(".secondLine").css({
  //   'left': ($(window).width() - $(".secondLine").children('span').width())/2 - 80
  // });

  //console.log("College width");
  console.log($(".secondLine").children('span').width());
  console.log("Second Width! " + ($(window).width() - $(".secondLine").children('span').width())/2);

  // $(".menucse").css({
  //   'padding-left': ($('.navdrawer').width() - $(this).width())/2 + 20
  // });
  //
  // $(".menumech").css({
  //   'padding-left': ($('.navdrawer').width() - $(this).width())/2 + 10
  // });

  $(".firstLine").css({
    'left': ($(window).width() - $(this).children('span').width())/2 - 285
  });

  $(".secondLine").css({
    'left': ($(window).width() - $(this).children('span').width())/2 - 180
  });

  $(".presents").css({
    'left': ($(window).width() - $(this).width()/2) - 105
  });

  $("#clogo").css({
    'left': ($(window).width() - $("this").width())/2 - 180
  });

  $("#flogo").css({
    'left': ($(window).width() - $("this").width())/2 - 240
  });

  $(".socialbuttons").css({
    //'left': ($(window).height() - $(this).children('span').width())/2 - 285
    //'top': $(window).height() - 40,
    'left': ($(window).width() - $("this").width())/2 - 110
  });


  //$(".firstLine").css("left", Math.max(0, ((($(window).width() - $(this).children('span').outerWidth()) / 2)  - 285 )+ "px"));



  // presentsWidth = $(".presents").children('span').width();
  // console.log($(window).width());
  // presentsLeft = ($(window).width() - presentsWidth)/2;
  // console.log("Presents Width: " + presentsWidth);
  // console.log("Presents Left: " + presentsLeft);


  $(".socialaddress").html("");

  console.log("Logo");
  console.log(($(window).width() - $("#flogo").width())/2);

  // $("#flogo").css({
  //   'left': ($(window).width() - $("#flogo").width())/2 - 10
  // });

  $("#clogo").css({
    'width': '10%'
  });



  // if ($(window).width() ) {
  //
  // }
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
