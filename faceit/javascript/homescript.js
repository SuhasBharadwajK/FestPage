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
  }
  else if (windowWidth >= 1366) {
    $("#responsive").attr("href", "css/homestyles1366.css");
  }
  else if (windowWidth >= 1280) {
    $("#responsive").attr("href", "css/homestyles1280.css");
  }
  else {
    $("#responsive").attr("href", "css/homestyles.css");
  }
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
  console.log($(".lefthalf").height());
  console.log($(window).height());
  if (($(".lefthalf").height()) > (($(window).height()))) {
    setHeight();
  }

});

$(window).click(function(event) {
  /* Act on the event */
  setHeight();
});
