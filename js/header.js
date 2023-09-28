$(document).ready(function () {
    let heightHeader = $('.header').outerHeight(true);

    if ($(window).width() < 890) {
        $('.register').height(`${$(window).height() - heightHeader}px`);
        $('.nav_big_screen').addClass('no-show');
        $('.menu_btn.main').removeClass('no-show');
    } else {
        $('.register').removeAttr('style');
        $('.nav_big_screen').removeClass('no-show');
        $('.menu_btn.main').addClass('no-show');
    }

    $(window).on('resize', function () {
        if ($(window).width() < 890) {
            $('.register').height(`${$(window).height() - heightHeader}px`);
            $('.nav_big_screen').addClass('no-show');
            $('.menu_btn.main').removeClass('no-show');
        } else {
            $('.register').removeAttr('style');
            $('.nav_big_screen').removeClass('no-show');
            $('.menu_btn.main').addClass('no-show');
            $('.nav_small_screen').addClass('no-show');
        }
    });

    $('.menu_btn.main').on('click', () => {
        $('.menu_btn.main').addClass('no-show');
        $('.nav_small_screen').slideToggle(300);
    });

    $('.menu_btn.second').on('click', () => {
        $('.menu_btn.main').removeClass('no-show');
        $('.nav_small_screen').slideToggle(300);
    });
});