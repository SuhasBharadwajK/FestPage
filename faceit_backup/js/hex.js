$(document).ready(function(){
  alert("ABC");
});
// $('#cse').hover(
//   function() {
//     $("#cse").animate({height: '+=10px', width: '+=10px'}, 800);
//     $("#cse > .hexagon1").animate({height: '+=10px', width: '+=10px'}, 800);
//     $("#cse > .hexagon2").animate({height: '+=10px', width: '+=10px'}, 800);
//
//   },
//   function() {
//     $("#cse").animate({height: '-=10px', width: '-=10px'}, 500);
//
//   }
// );

$("#cse > .hexagon2").click(function() {
  $("#cse").animate({opacity: 0}, 1000);
});

$(".backgroundHolder").click(function() {
  console.log("Clicked");
});
