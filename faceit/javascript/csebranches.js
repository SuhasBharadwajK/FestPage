var currentId, activeId = "l1";

$(document).ready(function() {

  $("#l1").animate({
    marginTop: "+=100px", height: "+=400"},
    300, "easeOutCubic", function() {
      $(this).animate({
        width: '+=960px'},
        300, "easeOutCubic", function() {

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
    width: '-=960px',
    marginLeft: toLeft},
    200, function() {
      $(this).animate({
        marginTop: '-=100px', height: '-=400px'},
        400, "easeOutCubic", function() {
          expand(currentId);
      });
  });
}

function expand(expandId) {

  var factor = parseInt(expandId[1]);
  var toLeft = "-=" + (160 * (factor-1)).toString() + "px";

  $("#" + expandId).animate({
    marginTop: "+=100px", height: "+=400"},
    200, "easeOutCubic", function() {
      $(this).animate({
        marginLeft: toLeft,
        width: '+=960px'},
        400, "easeOutCubic", function() {
          $('.events').bind('click', eventClicked);
      });
  });
}
