$(document).ready(function() {
    // var $elie = $(".hexagon2");
    // var $elie0 = $(".hexagon"), degree = 0, timer;
    // var $elie1 = $(".hexagon1");
    // rotate();
    // function rotate() {
    //
    //     $elie.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
    //     $elie.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
    //     $elie.css('transform','rotate('+degree+'deg)');
    //
    //     $elie0.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
    //     $elie0.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
    //     $elie0.css('transform','rotate('+degree+'deg)');
    //
    //     $elie1.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
    //     $elie1.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
    //     $elie1.css('transform','rotate('+degree+'deg)');
    //
    //     timer = setTimeout(function() {
    //         degree += 60; rotate();
    //     },115);
    // }
});

// $(function() {
//     var $elie = $(".hexagon"), degree = 0, timer;
//     rotate();
//     function rotate() {
//
//         $elie.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
//         $elie.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
//         $elie.css('transform','rotate('+degree+'deg)');
//         timer = setTimeout(function() {
//             degree++;
//             rotate();
//         },5);
//     }
//
//     $("input").toggle(function() {
//         clearTimeout(timer);
//     }, function() {
//         rotate();
//     });
// });

setInterval(
    function () {
        $('.square').animate({rotate: '+=10deg'}, 0);
    },
    200
);

$(".square").hover(function() {
  $(this).addClass('box_rotate box_transition');
}, function() {
  $(this).removeClass('box_rotate box_transition');
});

$(".hexagon2").click(function(event) {
  /* Act on the event */
  $(this).animate({
    'background-color': '#000',
    },
    1000, function() {
    /* stuff to do after animation is complete */
    alert("Done");
  });
});

$(".hexagon2").hover(function() {
  alert("Hovered");
  /* Stuff to do when the mouse enters the element */
  $(this).addClass('box_rotate box_transition');
  $(".hexagon").addClass('box_rotate box_transition');
  $(".hexagon1").addClass('box_rotate box_transition');
}, function() {
  /* Stuff to do when the mouse leaves the element */
  $(this).removeClass('box_rotate box_transition');
  $(".hexagon").removeClass('box_rotate box_transition');
  $(".hexagon1").removeClass('box_rotate box_transition');

});
