$(document).ready(function () {
    if ($(window).width() < 768) {
        $('.nav_big_screen').addClass('no-show');
        $('.menu_btn.main').removeClass('no-show');
    } else {
        $('.nav_big_screen').removeClass('no-show');
        $('.menu_btn.main').addClass('no-show');
    }

    $(window).on('resize', function () {
        if ($(window).width() < 768) {
            $('.nav_big_screen').addClass('no-show');
            $('.menu_btn.main').removeClass('no-show');
        } else {
            $('.nav_big_screen').removeClass('no-show');
            $('.menu_btn.main').addClass('no-show');
            $('.nav_small_screen').addClass('no-show');
        }
    });

    $('.menu_btn.main').on('click', () => {
        $('.menu_btn.main').addClass('no-show');
        $('.nav_small_screen').toggleClass('no-show');
    });

    $('.menu_btn.second').on('click', () => {
        $('.menu_btn.main').removeClass('no-show');
        $('.nav_small_screen').toggleClass('no-show');
    });
});