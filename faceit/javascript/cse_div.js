var currentId, activeId = "l1";
$(document).ready(function(){



  $("#l1").animate({left: "+=250px",  width: "600px"}, 300, "easeOutCubic", function() {
    $(this).animate({height: "580px"}, 400);
  });

  $('.events').click(eventClicked);

});

function eventClicked() {
  currentId = $(this).attr('id');
  console.log(currentId);
  console.log(activeId);
  if (activeId != currentId) {
    $('.events').unbind('click', eventClicked);
    revert(activeId, currentId);
    activeId = currentId;
    //setTimeout(, 1400);
    console.log("Second " + activeId + currentId);
  }
}

function revert(revertId, expandId) {
  var factor = parseInt(revertId[1]);
  var toTop = "+=" + (100 * (factor-1)).toString() + "px";
  $("#" + revertId).animate({ top: toTop, height: "-=500px"}, 200, function() {
    $(this).animate({left: "-=250px",  width: "200px"}, 400, "easeOutCubic", function() {expand(expandId)});
  });
}

function expand(expandId) {
  var factor = parseInt(expandId[1]);
  var toTop = "-=" + (100 * (factor-1)).toString() + "px";
  $("#" + expandId).animate({left: "+=250px", width:"600px"}, 300, "easeOutCubic", function() {
    $(this).animate({ top: toTop, height: "580px" }, 400, "easeOutCubic", function() {$('.events').bind('click', eventClicked)});
  });
}
