var opened = false;
var openedId = "";
var fromBranch = false;

$('document').ready(function() {
  $('.navbranch').click(openEvents);
  setMobileHandlers();
});

function setMobileHandlers() {
  $('.card').click(expandCard);
  $('.closeimg').click(closeCard);
  for(keyElement in keyElements) {
    //console.log("Key:" + keyElements[keyElement]);
    $(keyElements[keyElement]).swipe( {
      swipeRight:openNav, swipeLeft:closeNav, threshold:80
    });
  }
  for(keyElement in keyElements) {
    if (keyElements[keyElement] != ".navdrawer") {
      $(keyElements[keyElement]).click(function(event) {
        closeNav();
      });
    }
  }
  $('.markbox').change(function(event) {
    //alert("Flicked!");
    if ($(this).is(":checked")) {
      $(this).parent().children('.marklabel').html("Marked!");
    }
    else {
      $(this).parent().children('.marklabel').html("Mark this event");
    }
  });
}

function expandCard() {
  $(this).unbind('click', expandCard);
  if(!opened) {
       $(this).animate({
          height: '600px'
       }, 200, function() {
           $(this).css({'overflow-y' : 'auto'});
           $(this).children('.closeimgholder').css({'display': 'block'});
       });
      opened = true;
      openedId = $(this).attr('id');
  }
  else {
    $('#' + openedId).animate({
        height: '80px'
    }, 200, function() {
      $(this).css({'overflow-y' : 'hidden'});
      $(this).bind('click', expandCard);
      $(this).children('.closeimgholder').css({'display': 'none'});
      var myDiv = document.getElementById($(this).attr('id'));
      myDiv.scrollTop = 0;
      opened = true;
    });
    opened = true;
    $(this).animate({
       height: '600px'
    }, 200, function() {
        $(this).css({'overflow-y' : 'auto'});
        $(this).children('.closeimgholder').css({'display': 'block'});
    });
   opened = true;
   openedId = $(this).attr('id');
  }
}

function closeCard() {
  $('#' + openedId).animate({
   height: '80px'
 }, 200, function() {
     $(this).css({'overflow-y' : 'hidden'});
     $(this).bind('click', expandCard);
     $(this).children('.closeimgholder').css({'display': 'none'});
  });
  $('#' + openedId).scrollTop = 0;
  var myDiv = document.getElementById($('#' + openedId).attr('id'));
  myDiv.scrollTop = 0;
  opened = false;
  openedId = "";
}

function openEvents() {
  closeNav();
  console.log(currentPage);
  if (pageStack[pageStack.length - 1] != currentPage) {
    pageStack.push(currentPage);
  }
  currentPage = $(this).attr("value");

  console.log($(this).attr("value"));

  if (currentPage != "home") {
    fromBranch = true;
    clearInterval(backgroundChange);
    $('.mobileholder').html(pagesGot[pages.indexOf(currentPage)]);
    setMobileHandlers();
    $('.mobileholder').css({'display' : 'block'});
    $('.hamburger').css({'visibility' : 'collapse'});
  }
  else {
    fromBranch = false;
    $('.mobileholder').css({'display' : 'none'});
    $('.hamburger').css({'visibility' : 'visible'});
    backgroundChange = setInterval(changeBackground, 3500);
  }

}
