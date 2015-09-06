var currentId, activeId = "l1";

$(document).ready(function() {

  $("#l1").animate({
    marginTop: '+=100px'},
    400, function() {
    $(this).animate({
      width: "+=800px"},
      300, function() {
      $(this).animate({
        height: "+=400px"},
        300, "easeOutCubic");
    });
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
    console.log("Second " + activeId + currentId);
  }

}

function revert(revertId, currentId) {
  var factor = parseInt(revertId[1]);
  var toLeft = "+=" + (160 * (factor-1)).toString() + "px";
  console.log(factor);
  $("#" + revertId).animate({
    height: '-=400px'},
    300, "easeOutCubic", function() {
      $(this).animate({
        width: '-=800px',
        marginLeft: toLeft},
        300, "easeOutCubic", function() {
          $(this).animate({
            marginTop: '-=100px'},
            300, "easeOutCubic", function() {
              expand(currentId);
          });
      });
  });
  // if (revertId == "l1") {
  //   $("#" + revertId).animate({
  //     height: '-=400px'},
  //     300, function() {
  //     $(this).animate({
  //       width: '-=800px'},
  //       300, function() {
  //         $(this).animate({
  //           marginTop: '-=100px'},
  //           300, function() {
  //             expand(currentId);
  //         });
  //     });
  //   });
  // }
  //
  // if (revertId == "l2") {
  //   $("#" + revertId).animate({
  //     height: '-=400px'},
  //     300, function() {
  //     $(this).animate({
  //       width: '-=800px',
  //       marginLeft: '+=160px'},
  //       300, function() {
  //         $(this).animate({
  //           marginTop: '-=100px'},
  //           300, function() {
  //             expand(currentId);
  //         });
  //     });
  //   });
  // }
  //
  // if (revertId == "l3") {
  //   $("#" + revertId).animate({
  //     height: '-=400px'},
  //     300, function() {
  //     $(this).animate({
  //       width: '-=800px',
  //       marginLeft: '+=320px'},
  //       300, function() {
  //         $(this).animate({
  //           marginTop: '-=100px'},
  //           300, function() {
  //             expand(currentId);
  //         });
  //     });
  //   });
  // }
  //
  // if (revertId == "l4") {
  //   $("#" + revertId).animate({
  //     height: '-=400px'},
  //     300, function() {
  //     $(this).animate({
  //       width: '-=800px',
  //       marginLeft: '+=480px'},
  //       300, function() {
  //         $(this).animate({
  //           marginTop: '-=100px'},
  //           300, function() {
  //             expand(currentId);
  //         });
  //     });
  //   });
  // }
  //
  // if (revertId == "l5") {
  //   $("#" + revertId).animate({
  //     height: '-=400px'},
  //     300, function() {
  //     $(this).animate({
  //       width: '-=800px',
  //       marginLeft: '+=640px'},
  //       300, function() {
  //         $(this).animate({
  //           marginTop: '-=100px'},
  //           300, function() {
  //             expand(currentId);
  //         });
  //     });
  //   });
  // }
  //
  // if (revertId == "l6") {
  //   $("#" + revertId).animate({
  //     height: '-=400px'},
  //     300, function() {
  //     $(this).animate({
  //       width: '-=800px',
  //       marginLeft: '+=800px'},
  //       300, function() {
  //         $(this).animate({
  //           marginTop: '-=100px'},
  //           300, function() {
  //             expand(currentId);
  //         });
  //     });
  //   });
  // }




}

function expand(expandId) {

  var factor = parseInt(expandId[1]);
  var toLeft = "-=" + (160 * (factor-1)).toString() + "px";
  $("#" + expandId).animate({
    marginTop: "+=100px",},
    300, "easeOutCubic", function() {
      $(this).animate({
        marginLeft: toLeft,
        width: '+=800px'},
        300, "easeOutCubic", function() {
          $(this).animate({
            height: "+=400"},
            300, "easeOutCubic", function() {
              $('.events').bind('click', eventClicked);
          });
      });
  });

  // if (expandId == "l1") {
  //   $("#" + expandId).animate({
  //     marginTop: "+=100px",},
  //     300, "easeOutCubic", function() {
  //       $(this).animate({
  //         width: '+=800px'},
  //         300, function() {
  //           $(this).animate({
  //             height: "+=400"},
  //             300, function() {
  //               $('.events').bind('click', eventClicked);
  //           });
  //       });
  //   });
  // }
  //
  // if (expandId == "l2") {
  //   $("#" + expandId).animate({
  //     marginTop: "+=100px"},
  //     300, "easeOutCubic", function() {
  //       $(this).animate({
  //         marginLeft: '-=160px',
  //         width: '+=800px'},
  //         300, function() {
  //           $(this).animate({
  //             height: "+=400"},
  //             300, function() {
  //               $('.events').bind('click', eventClicked);
  //           });
  //       });
  //   });
  // }
  //
  // if (expandId == "l3") {
  //   $("#" + expandId).animate({
  //     marginTop: "+=100px"},
  //     300, "easeOutCubic", function() {
  //       $(this).animate({
  //         marginLeft: '-=320px',
  //         width: '+=800px'},
  //         300, function() {
  //           $(this).animate({
  //             height: "+=400"},
  //             300, function() {
  //               $('.events').bind('click', eventClicked);
  //           });
  //       });
  //   });
  // }
  //
  // if (expandId == "l4") {
  //   $("#" + expandId).animate({
  //     marginTop: "+=100px"},
  //     300, "easeOutCubic", function() {
  //       $(this).animate({
  //         marginLeft: '-=480px',
  //         width: '+=800px'},
  //         300, function() {
  //           $(this).animate({
  //             height: "+=400"},
  //             300, function() {
  //               $('.events').bind('click', eventClicked);
  //           });
  //       });
  //   });
  // }
  //
  // if (expandId == "l5") {
  //   $("#" + expandId).animate({
  //     marginTop: "+=100px"},
  //     300, "easeOutCubic", function() {
  //       $(this).animate({
  //         marginLeft: '-=640px',
  //         width: '+=800px'},
  //         300, function() {
  //           $(this).animate({
  //             height: "+=400"},
  //             300, function() {
  //               $('.events').bind('click', eventClicked);
  //           });
  //       });
  //   });
  // }
  //
  // if (expandId == "l6") {
  //   $("#" + expandId).animate({
  //     marginTop: "+=100px"},
  //     300, "easeOutCubic", function() {
  //       $(this).animate({
  //         marginLeft: '-=800px',
  //         width: '+=800px'},
  //         300, function() {
  //           $(this).animate({
  //             height: "+=400"},
  //             300, function() {
  //               $('.events').bind('click', eventClicked);
  //           });
  //       });
  //   });
  // }

}
