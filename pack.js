// reveal on click
$(document).on('click', '#cards .card', function () {

    // get the first li item with active class or shaker class
    var $selected = $(".pack-wrapper div div.active, .pack-wrapper div div.shaker");

    // get the clicked item
    var $next = $(this);

    // hide last active item
    $selected.removeClass("active shaker");
    $selected.addClass("shrink");

    if ($next.hasClass('show')) {
        $next.removeClass('shrink');
        $next.addClass('active');
    } else {
        $next.addClass('shaker');

        setTimeout(function () {
            $next.addClass('active show');
        }, 700);
    }

    return false;
});

$(document).ready(function() {
    // trigger the pack
    $("#pack-standard").click(function () {


        $("#pack-standard").fadeOut(1000);
        $(".pack-container").delay(800).fadeOut(200);
        $(".pack-wrapper").delay(800).fadeIn(500);

        // setTimeout(function () {
        //     $(".pack-wrapper ul li:first-child").addClass("active");
        //     $(".pack-wrapper ul li:first-child").addClass("show");
        //     var audio = $("#rumble-sound")[0];
        //     audio.play();
        //     // notification
        //     $(".note-box").slideDown();
        // }, 2700);

        return false;

    });
});



// pack transition
window.onload = function () {
    $body = $('body'),
        $btn = $('.btn');

    $btn.on('click', function () {
        $body.removeClass().addClass('restart');
        loader(getRandomNumber(300));
    });

    function loader(delay) {
        setTimeout(function () {
            $body.addClass('loading');
        }, delay);

        setTimeout(function () {
            $body.addClass('loaded');
        }, delay + 1700);

        setTimeout(function () {
            $body.removeClass('restart').addClass('new-page');
        }, delay + 1950);
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// // sound controller
// var audio = $("#tear-pack-sound")[0];
// $("#pack-standard").mouseup(function () {
//     audio.play();
// });


function randomCard(card, min, max) {
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    $(card).find("img:last-child").attr('src', randomNumber + '.png'); // set a new image
}

$(function () { // Waiting for the DOM ready
    $('#cards .card').each(function() {
        randomCard(this, 1, 3);
    });
});