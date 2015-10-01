var opened = false;
var openedId = "";
var leftbackup = "", rightbackup = "";

$('document').ready(function() {
    $('.card').click(expandCard);
    $('.closeimg').click(closeCard);
    $('.navbranch').click(openEvents);
});

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
  if (pageStack[pageStack.length - 1] != currentPage) {
    pageStack.push(currentPage);
  }

  clearInterval(backgroundChange);
  console.log($(this).attr("value"));
  currentPage = $(this).attr("value");
  $('.mobileholder').css({'display' : 'block'});
  if (leftbackup == "") {
    leftbackup = $('.lefthalf').html();
    rightbackup = $('.righthalf').html();
    //clearInterval(backgroundChange);
    // ajax
  }
}
