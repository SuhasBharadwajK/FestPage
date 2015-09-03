$(document).ready(function() {
  //$(".lefthalf").height($(window).height());
  //$(".righthalf").height($(window).height());
  setHeight();
  // var heightof = $(window).height();
  // console.log(heightof);
  // var left = document.getElementById('left');
  // left.height(heightof);
  // console.log(typeof $(window).height());

  var windowWidth = parseInt($(this).width());
  console.log(windowWidth);
  if (windowWidth >= 1600) {
    $("#responsive").attr("href", "css/homestyles1600.css");
    console.log("1600");
  }
  else if (windowWidth >= 1366) {
    $("#responsive").attr("href", "css/homestyles1366.css");
    console.log("1366");
  }
  else if (windowWidth >= 1280) {
    $("#responsive").attr("href", "css/homestyles1280.css");
    console.log("1280");
  }
  else {
    $("#responsive").attr("href", "css/homestyles.css");
  }

  $(window).click(function(event) {
    /* Act on the event */
    setHeight();
  });

  var socialLeft = ((((42.5 * windowWidth) / 100)) - 250)/2 - 40;
  //socialLeft = socialLeft + "";
  console.log(socialLeft);
  $(".socialbuttons").css({
    'left': socialLeft
  });

  $(".socialaddress").css({
    'left': socialLeft + 50
  });

  // var socialTop = $(window).height() - $(this).height();
  // $(".socialbuttons").css({
  //    'margin-top': socialTop
  //  });
  $(".socialbutton").hover(function() {
    /* Stuff to do when the mouse enters the element */
    var id = $(this).attr("id");
    console.log(id);
    $(this).find('img').fadeOut('fast', function() {
      $(this).attr('src', 'images/' + id + '.png');
      $(this).fadeIn('fast');
    });
    $(this).animate({
      param1: value1,
      param2: value2},
      speed, function() {
      /* stuff to do after animation is complete */
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

setTimeout(function(){
    //do what you need here
    //alert("Timed out!");
}, 200);

$(document).keydown(function(event) {
  if (($(".lefthalf").height()) > (($(window).height()))) {
    setHeight();
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
