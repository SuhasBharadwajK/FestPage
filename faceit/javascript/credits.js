var patrons = Array();
var currentvalue = "";

$(document).ready(function() {
  //alert($(window).height());
  $('.descholder').height($(window).height() - 20);
  $.ajax({
    url: 'pages/coords.html',
    type: 'GET',
    success: function(response) {
      var myDiv = document.getElementById($('.descholder').attr('id'));
      myDiv.scrollTop = 0;
      $('.descholder').fadeOut('fast', function() {
        $('.descholder').html(response);
        $('.descholder').fadeIn('fast');
      });
    },
    error: function(response) {
      console.log(response);
    }
  });
  $('.menuelement').click(function(event) {
    if (currentvalue != $(this).attr('value')) {
      $('.arrow').css({
        'background-color': 'rgb(232, 232, 232)',
        'width': '30px',
        'height':'100%',
        'border':'none'
      });
      $(this).children('.arrow').css({
        'width': '0',
        'height': '0',
        'border-top': '50px solid transparent',
        'border-bottom' : '50px solid transparent',
        'border-left' : '30px solid rgb(203, 203, 203)',
        'background-color' : 'rgb(232, 232, 232)'
      });
      currentvalue = $(this).attr('value');
      //$('.descholder').html(patrons[parseInt($(this).attr('id')[1])]);
      if (currentvalue == 'trailer.html') {
        $('.descholder').fadeOut('fast', function() {
          $('.descholder').html('<div class="trailer"><iframe width="900" height="615" src="https://www.youtube.com/embed/FqYWKz1YlSE" frameborder="0" allowfullscreen></iframe></div>');
          $('.descholder').fadeIn('fast');
        });
      }
      else if (currentvalue == 'route.html') {
        $('.descholder').fadeOut('fast', function() {
          $('.descholder').html('<div class="map"><iframe width="900" height="650" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJY3T67K25KDoRcLNgdyRj-SI&zoom=11&key=AIzaSyAozmjbFcKy5ColstJhSxsI-w77X44K8pM" allowfullscreen></iframe></div>');
          $('.descholder').fadeIn('fast');
        });
      }
      else {
        $.ajax({
          url: 'pages/' + currentvalue,
          type: 'GET',
          success: function(response) {
            var myDiv = document.getElementById($('.descholder').attr('id'));
            myDiv.scrollTop = 0;
            $('.descholder').fadeOut('fast', function() {
              $('.descholder').html(response);
              $('.descholder').fadeIn('fast');
            });
          },
          error: function(response) {
            console.log(response);
          }
        });
      }
    }
  });
});

$(window).resize(function(event) {
  $('.descholder').height($(window).height() - 20);
});
