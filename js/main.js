$(document).ready(function () {
    if ($(window).width() < 890) {
        $('.nav_big_screen').addClass('no-show');
        $('.menu_btn.main').removeClass('no-show');
        $('.register').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
        $('.login').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
    } else {
        $('.nav_big_screen').removeClass('no-show');
        $('.menu_btn.main').addClass('no-show');
    }

    if ($(window).width() < 821) {
        $('.basket_product').css('display', 'none');
        $('.basket_product.mobile').css('display', 'block');
    }

    $(window).on('resize', function () {
        if ($(window).width() < 890) {
            $('.nav_big_screen').addClass('no-show');
            $('.menu_btn.main').removeClass('no-show');
            $('.register').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
            $('.login').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
        } else {
            $('.register').removeAttr('style');
            $('.login').removeAttr('style');
            $('.nav_big_screen').removeClass('no-show');
            $('.menu_btn.main').addClass('no-show');
            $('.nav_small_screen').addClass('no-show');
        }

        $('.main_screen').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
        $('.nav_small_screen').css('height', `${$(window).height()}px`);
    });

    $('.main_screen').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
    $('.card_img').css('height', `${$('.card').width()}px`);
    $('.nav_small_screen').css('height', `${$(window).height()}px`);

    if ($(window).width() > 820) {
        $('.basket_product_operation').css('width', `${$('.basket_section_operation_product').width()}px`)
    }

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
        $(this).toggleClass('basket_card');
        $(this).parent().find('.operation').toggleClass('no-show quantity_operation');

        if ($(this).hasClass('basket_card')) {
            $(this).html('В КОРЗИНЕ');
        } else {
            $(this).parent().find('.operation').find('.number').html('1');
            $(this).html('КУПИТЬ');
        }
    });

    $('.product_buy').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('basket_card');
        $(this).parent().find('.operation').toggleClass('no-show product_count');

        if ($(this).hasClass('basket_card')) {
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

        let totalSumBasket = 0;

        $('.basket_product').each((index, el) => {
            let productSum = Number($(el).find('.product_basket_price').html().replace(/[\₽\s]+/g, '')) * Number($(el).find('.number').html());
            totalSumBasket += productSum;
            $(el).find('.basket_product_all_price').html(`${productSum.toLocaleString('ru-RU')} ₽`);
        });

        $('.basket_all_price').html(`${totalSumBasket.toLocaleString('ru-RU')} ₽`);
    });

    $('.minus').on('click', function (e) {
        e.preventDefault();
        let count = Number($(this).parent().find('.number').html());

        if (count == 1) {
            if ($(this).parent().hasClass('quantity_operation')) {
                $(this).parent().toggleClass('no-show quantity_operation');
                $(this).parent().parent().find('.card_button').html('КУПИТЬ').toggleClass('basket_card');
            } else if ($(this).parent().hasClass('product_count')) {
                $(this).parent().toggleClass('no-show product_count');
                $(this).parent().parent().find('.product_buy').html('КУПИТЬ').toggleClass('basket_card');
            } else {
                $(this).closest('.basket_product').remove();
            }
            $(this).parent().find('.number').html('1');
        } else {
            $(this).parent().find('.number').html(count - 1);
        }

        let totalSumBasket = 0;

        $('.basket_product').each((index, el) => {
            let productSum = Number($(el).find('.product_basket_price').html().replace(/[\₽\s]+/g, '')) * Number($(el).find('.number').html());
            totalSumBasket += productSum;
            $(el).find('.basket_product_all_price').html(`${productSum.toLocaleString('ru-RU')} ₽`);
        });

        $('.basket_all_price').html(`${totalSumBasket.toLocaleString('ru-RU')} ₽`);
    });

    $('.basket_button').on('click', function (e) {
        e.preventDefault();
    });

    $('.button_up').on('click', function (e) {
        e.preventDefault();

        $('body,html').animate({
            scrollTop: 0
        }, 400);
    });
});
