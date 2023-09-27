$(document).ready(function () {
    let heightHeader = $('.header').outerHeight(true);
    $('.main_screen').css('height', `${$(window).height() - heightHeader}px`);

    $('.card_img').css('height', $('.card').width());
    $('.nav_small_screen').css('height', `${$(window).height()}px`);

    $('.product_img').on('click', function() {
        $(this).toggleClass('no-show');
        $('.playlist').toggleClass('no-show');
    });

    $('.playlist').on('click', function() {
        $(this).toggleClass('no-show');
        $('.product_img').toggleClass('no-show');
    });

    $(window).on('resize', function () {
        $('.main_screen').css('height', `${$(window).height() - heightHeader}px`);
        $('.nav_small_screen').css('height', `${$(window).height()}px`);
    });

    $('.card_button').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('basket');
        $(this).parent().find('.operation').toggleClass('no-show quantity_operation');

        if ($(this).hasClass('basket')) {
            $(this).html('В КОРЗИНЕ');
        } else {
            $(this).parent().find('.operation').find('.number').html('1');
            $(this).html('КУПИТЬ');
        }
    });

    $('.product_buy').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('basket');
        $(this).parent().find('.operation').toggleClass('no-show product_count');

        if ($(this).hasClass('basket')) {
            $(this).html('В КОРЗИНЕ');
        } else {
            $(this).parent().find('.operation').find('.number').html('1');
            $(this).html('КУПИТЬ');
        }
    })

    $('.plus').on('click', function (e) {
        e.preventDefault();
        let count = Number($(this).parent().find('.number').html());
        $(this).parent().find('.number').html(count + 1);
    });

    $('.minus').on('click', function (e) {
        e.preventDefault();
        let count = Number($(this).parent().find('.number').html());

        if (count == 1) {
            if ($(this).parent().hasClass('quantity_operation')) {
                $(this).parent().toggleClass('no-show quantity_operation');
                $(this).parent().parent().find('.card_button').html('КУПИТЬ').toggleClass('basket');
            } else {
                $(this).parent().toggleClass('no-show product_count');
                $(this).parent().parent().find('.product_buy').html('КУПИТЬ').toggleClass('basket');
            }
            $(this).parent().find('.number').html('1');
        } else {
            $(this).parent().find('.number').html(count - 1);
        }
    });

    $('.button_up').on('click', function (e) {
        e.preventDefault();

        $('body,html').animate({
            scrollTop: 0
        }, 400);
    });
});
