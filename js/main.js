$(document).ready(function () {
    let heightHeader = $('header').outerHeight(true);

    console.log(heightHeader);

    if ($(window).width() < 890) {
        $('.register').css('height', `${$(window).height() - heightHeader}px`);
        $('.login').css('height', `${$(window).height() - heightHeader}px`);
        $('.nav_big_screen').addClass('no-show');
        $('.menu_btn.main').removeClass('no-show');
    } else {
        $('.register').removeAttr('style');
        $('.login').removeAttr('style');
        $('.nav_big_screen').removeClass('no-show');
        $('.menu_btn.main').addClass('no-show');
    }

    $(window).on('resize', function () {
        if ($(window).width() < 890) {
            $('.register').css('height', `${$(window).height() - heightHeader}px`);
            $('.login').css('height', `${$(window).height() - heightHeader}px`);
            $('.nav_big_screen').addClass('no-show');
            $('.menu_btn.main').removeClass('no-show');
        } else {
            $('.register').removeAttr('style');
            $('.login').removeAttr('style');
            $('.nav_big_screen').removeClass('no-show');
            $('.menu_btn.main').addClass('no-show');
            $('.nav_small_screen').addClass('no-show');
        }
    });

    $(window).on('resize', function () {
        $('.main_screen').css('height', `${$(window).height() - heightHeader}px`);
        $('.nav_small_screen').css('height', `${$(window).height()}px`);
    });

    $('.main_screen').css('height', `${$(window).height() - heightHeader}px`);
    $('.card_img').css('height', `${$('.card').width()}px`);
    $('.nav_small_screen').css('height', `${$(window).height()}px`);

    $('.menu_btn.main').on('click', () => {
        $('.menu_btn.main').addClass('no-show');
        $('.nav_small_screen').slideToggle(300);
    });

    $('.menu_btn.second').on('click', () => {
        $('.menu_btn.main').removeClass('no-show');
        $('.nav_small_screen').slideToggle(300);
    });

    $('.product_img').on('click', function () {
        $(this).toggleClass('no-show');
        $('.playlist').toggleClass('no-show');
    });

    $('.playlist').on('click', function () {
        $(this).toggleClass('no-show');
        $('.product_img').toggleClass('no-show');
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

    $('.product_buy').on('click', function (e) {
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

    setTimeout(() => {
        $('.loader').fadeToggle(300, () => {
            $('header, main, footer').animate({
                opacity: 1
            }, 300, 'swing', () => {
                $('header, main, footer').removeClass('opacity');
            });
        });
    }, 150);
});
