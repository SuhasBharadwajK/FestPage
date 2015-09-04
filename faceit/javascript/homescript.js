$(document).load(function() {
  /* Act on the event */
  //respond();
});
$(document).ready(function() {
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

  $(window).click(function(event) {
    /* Act on the event */
    setHeight();
    respond();
    console.log("Clicked!");

  });
  setTimeout(function(){$(window).trigger('click');} , 100);

  //$(window).trigger('click');

  // $('#cse').fadeIn('slow', function() {
  //
  // });

  $("#faceit").fadeTo('fast', 0.5, function() {
    $(this).fadeTo('slow', 1);
  });
  $("#cse").fadeTo('slow', 0.5, function() {
    $(this).fadeTo('slow', 1, function() {
      $(this).animate({
        left: "+=18px",
        top: "+=32px"
        },
        800);

      });
  });
  $("#ece").fadeTo('slow', 0.5, function() {
    $(this).fadeTo('slow', 1, function() {
      $(this).animate({
        left: "-=18px",
        top: "+=32px"
        },
        800);

      });
  });
  $("#mech").fadeTo('slow', 0.5, function() {
    $(this).fadeTo('slow', 1, function() {
      $(this).animate({
        left: "+=20px"
        },
        800);

      });
  });
  $("#civ").fadeTo('slow', 0.5, function() {
    $(this).fadeTo('slow', 1, function() {
      $(this).animate({
        left: "-=20px"
        },
        800);

      });
  });
  $("#it").fadeTo('slow', 0.5, function() {
    $(this).fadeTo('slow', 1, function() {
      $(this).animate({
        left: "+=20px",
        top: "-=20px"
        },
        800);

      });
  });
  $("#eee").fadeTo('slow', 0.5, function() {
    $(this).fadeTo('slow', 1, function() {
      $(this).animate({
        left: "-=20px",
        top: "-=20px"
        },
        800);

      });
  });
  // $("#cse").animate({
  //   opacity: 1},
  //   400, function() {
  //     $(this).animate({
  //       left: "+=18px",
  //       top: "+=32px"
  //       },
  //       1000);
  //   /* stuff to do after animation is complete */
  // });
  //respond()

  // $("#cse").fadeIn('slow', function() {
  //
  //
  // });



  // var socialTop = $(window).height() - $(this).height();
  // $(".socialbuttons").css({
  //    'margin-top': socialTop
  //  });
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

function setHeight() {
  $(".lefthalf").height($(window).height());
  $(".righthalf").height($(window).height());
}

function respond() {
  var windowWidth = parseInt($(window).width());
  //alert(windowWidth);
  if (windowWidth >= 1600) {
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
