var opened = false;
var openedId = "";

$('document').ready(function() {
    $('.card').click(expandCard);
    $('.closeimg').click(closeCard);
});

function expandCard() {
  $(this).unbind('click', expandCard);
  if(!opened) {
       $(this).animate({
          height: '600px'
       }, 400, function() {
           $(this).css({'overflow-y' : 'auto'});
           $(this).children('.closeimgholder').css({'display': 'block'});
       });
      opened = true;
      openedId = $(this).attr('id');
  }
  else {
    $('#' + openedId).animate({
        height: '80px'
    }, 400, function() {
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
    }, 400, function() {
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
   }, 400, function() {
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
