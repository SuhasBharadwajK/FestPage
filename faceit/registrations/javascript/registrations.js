var currentPage = "registrations";
var currentOpenedMenu = "";
var lastOpenedMenu = "";
var lastTable = "";

$(window).keydown(function(event) {
  if (event.keyCode == 27) {
    closeMenu(currentOpenedMenu, true);
  }
});

$(document).ready(function() {
  window.setInterval(function() {
    requestTables(currentPage);
  }, 1000);

  $.ajax({
    url: 'list.php',
    type: 'GET',
    data: 'tableName=registrations',
    success: function(response){
      $('table').html(response);
    }
  });

  $('.branch').dblclick(function(event) {
    $('.branch').css({'border-bottom': 'none'});
    if ($(this).attr('id') == "home") {
      closeMenu(currentOpenedMenu, false);
      $(this).css({'border-bottom': '5px solid white'});
    }
    else {
      if (currentOpenedMenu == $(this).attr('id')) {
        closeMenu($(this).attr('id'), true);
      }
      else {
        openMenu($(this));
      }
    }
  });

  $('.branch span').click(function(event) {
    closeMenu($(this).parent('.branch').attr('id'), true);
    $('.heading span').html($(this).html());
    $('.branch').children(".event").toggle();
    $('.branch').css({'border-bottom': 'none'});
    $(this).parent('.branch').css({'border-bottom': '5px solid white'});
    currentPage = $(this).parent('.branch').attr('value')
    requestTables(currentPage);
  });

  $('.branch .event').click(function(event) {
    closeMenu(currentOpenedMenu, false);
    $('.heading span').html($(this).html());
    event.stopPropagation();
    currentPage = $(this).attr('value')
    requestTables(currentPage);
  });

});

function openMenu(eventItself) {
  closeMenu(currentOpenedMenu, false);
  $('#' + currentPage).css({'border': 'none'});
  eventItself.children('.eventholder').animate({
    marginTop: '20px'},
    300, function() {
      eventItself.css({'border-bottom': '5px solid white'});
      currentOpenedMenu = eventItself.attr("id");
      $('.eventholder').css({'z-index' : 55});
  });
}

function closeMenu(openedMenuId, fromEsc) {
  $('.eventholder').css({'z-index' : '-1'});
  openedMenu = $('#' + openedMenuId);
  if (!fromEsc) {
    openedMenu.css({'border': 'none'});
  }
  openedMenu.children('.eventholder').animate({
    marginTop: '-400px'},
    300, function() {
      currentOpenedMenu = "";
  });
}

function requestTables(tableName) {
  if (tableName != undefined && tableName != currentOpenedMenu) {
    $.ajax({
      url: 'list.php',
      type: 'GET',
      data: 'tableName=' + tableName
    })
    .done(function(result) {
      $('table').html(result);
    });

  }
}
