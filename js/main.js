$(document).ready(function () {
    let height = $('.header').outerHeight(true);
    $('main.main').css({
        'height': `${$(window).height() - height}px`
    });

    $('nav_small_screen').css({
        'height': `${$(window).height()}px`
    });

    $('.card_img').css('height', $('.card').width());
});