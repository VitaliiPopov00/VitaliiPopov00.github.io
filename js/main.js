$(document).ready(function () {
    let height = $('.header').outerHeight(true);
    $('main.main').css({
        'height': `${$(window).height() - height}px`
    });
});