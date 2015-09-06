var currentId, activeId = "l1";
$(document).ready(function(){



  $("#l1").animate({left: "+=250px",  width: "600px"}, 300, function() {
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

  // if (revertId == "l1") {
  //   $("#" + revertId).animate({height: "-=500px"}, 200, function() {
  //     $(this).animate({left: "-=250px",  width: "200px"}, 400, "easeOutCubic", function() {expand(expandId)});
  //   });
  // }
  //
  // if (revertId == "l2") {
  //   $("#" + revertId).animate({ top: "+=100px", height: "-=500px" }, 200, function() {
  //     $(this).animate({left: "-=250px", width:"-=400px"}, 400, "easeOutCubic", function() {expand(expandId)});
  //   });
  // }
  //
  // if (revertId == "l3") {
  //   $("#" + revertId).animate({ top: "+=200px", height: "-=500px" }, 200, function() {
  //     $(this).animate({left: "-=250px", width:"-=400px"}, 400, "easeOutCubic", function() {expand(expandId)});
  //   });
  // }
  //
  // if (revertId == "l4") {
  //   $("#" + revertId).animate({ top: "+=300px", height: "-=500px" }, 200, function() {
  //     $(this).animate({left: "-=250px", width:"-=400px"}, 400, "easeOutCubic", function() {expand(expandId)});
  //   });
  // }
  //
  // if (revertId == "l5") {
  //   $("#" + revertId).animate({ top: "+=400px", height: "-=500px" }, 200, function() {
  //     $(this).animate({left: "-=250px", width:"-=400px"}, 400, "easeOutCubic", function() {expand(expandId)});
  //   });
  // }
  //
  // if (revertId == "l6") {
  //   $("#" + revertId).animate({ top: "+=500px", height: "-=500px" }, 200, function() {
  //     $(this).animate({left: "-=250px", width:"-=400px"}, 400, "easeOutCubic", function() {expand(expandId)});
  //   });
  // }

}

function expand(expandId) {
  var factor = parseInt(expandId[1]);
  var toTop = "-=" + (100 * (factor-1)).toString() + "px";
  $("#" + expandId).animate({left: "+=250px", width:"600px"}, 300, "easeOutCubic", function() {
    $(this).animate({ top: toTop, height: "580px" }, 400, function() {$('.events').bind('click', eventClicked)});
  });

  // if (expandId == "l1") {
  //
  //   $("#l1").animate({left: "+=250px",  width: "600px"}, 300, "easeOutCubic", function() {
  //     $(this).animate({height: "580px"}, 400, function() {$('.events').bind('click', eventClicked)});
  //   });
  //
  // }
  // if (expandId == "l2") {
  //
  //   $("#l2").animate({left: "+=250px", width:"600px"}, 300, "easeOutCubic", function() {
  //     $(this).animate({ top: "-=100px", height: "580px" }, 400, function() {$('.events').bind('click', eventClicked)});
  //   });
  // }
  // if (expandId == "l3") {
  //   $("#l3").animate({left: "+=250px", width:"+=400px"}, 300, "easeOutCubic", function() {
  //     $(this).animate({top: "-=200px", height:"+=500px"}, 400, function() {$('.events').bind('click', eventClicked)});
  //   });
  //
  // }
  // if (expandId == "l4") {
  //   $("#l4").animate({left: "+=250px", width:"+=400px"}, 300, "easeOutCubic", function() {
  //     $(this).animate({top: "-=300px", height:"+=500px"}, 400, function() {$('.events').bind('click', eventClicked)});
  //   });
  // }
  // if (expandId == "l5") {
  //   $("#l5").animate({left: "+=250px", width:"+=400px"}, 300, "easeOutCubic", function() {
  //     $(this).animate({top: "-=400px", height:"+=500px"}, 400, function() {$('.events').bind('click', eventClicked)});
  //   });
  // }
  // if (expandId == "l6") {
  //   $("#l6").animate({left: "+=250px", width:"+=400px"}, 300, "easeOutCubic", function() {
  //     $(this).animate({top: "-=500px", height:"+=500px"}, 400, function() {$('.events').bind('click', eventClicked)});
  //   });
  // }
}
