$(document).ready(function() {
  console.log("Mobile");
  $(window).resize(function(event) {
    respond();
  });
  setHeight();
  $(".righthalf").children().append($('.lefthalf').children());
});

function respond() {
  var windowWidth = parseInt($(document).width());
  console.log(windowWidth);
  if (windowWidth >= 1600) {
    $("#responsive").attr("href", "css/homestyles1600.css");
    $("#jssource").attr("src", "javascript/homescript.js");
    //console.log("1600");
  }
  else if (windowWidth >= 1366) {
    $("#responsive").attr("href", "css/homestyles1366.css");
    $("#jssource").attr("src", "javascript/homescript.js");
    //console.log("1366");
  }
  else if (windowWidth >= 1280) {
    $("#responsive").attr("href", "css/homestyles1280.css");
    $("#jssource").attr("src", "javascript/homescript.js");
    //console.log("1280");
  }
  else if (windowWidth >= 1076) {
    //$("#responsive").attr("href", "css/homestyles1280.css");
    console.log(windowWidth);
  }
  else if (windowWidth <= 1076){
    console.log(windowWidth);
    $("#responsive").attr("href", "css/homestylesmobile.css");
    $("#jssource").attr("src", "javascript/homemobilescript.js");
  }


  $('.righthalf').css({
    "background-image": "url('images/background.jpg')",
    "background-position": "right"
    //property2: 'value2'
  });

  setHeight();

  //var socialLeft = ((((42.5 * windowWidth) / 100)) - 250)/2 - 40;
  //socialLeft = socialLeft + "";
  console.log(socialLeft);
  $(".socialbuttons").css({
    'left': socialLeft
  });

  $(".socialaddress").css({
    'left': socialLeft + 50
  });

}

function setHeight() {
  //$(".lefthalf").height($(window).height());
  $(".righthalf").height($(window).height());
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
