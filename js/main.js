$(document).ready(function () {
    let heightHeader = $('.header').outerHeight(true);
    $('.main_screen').css({
        'height': `${$(window).height() - heightHeader}px`
    });

    console.log($(window).height());
    console.log(heightHeader);

    $('.card_img').css('height', $('.card').width());
    $('.nav_small_screen').css('height', `${$(window).height()}px`);

    $('.card_button').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('basket');
        $(this).parent().find('.operation').toggleClass('no-show quantity_operation');

        if ($(this).hasClass('basket')) {
            $(this).html('В КОРЗИНЕ');

            $(this).parent().find('.operation').find('.plus').on('click', function () {
                let count = Number($(this).parent().find('.number').html());
                $(this).parent().find('.number').html(count + 1);
            });

            $(this).parent().find('.operation').find('.minus').on('click', function () {
                let count = Number($(this).parent().find('.number').html());

                if (count == 1) {
                    $(this).parent().toggleClass('no-show quantity_operation');
                    $(this).parent().parent().find('.card_button').html('КУПИТЬ').toggleClass('basket');
                    $(this).parent().find('.number').html('1');
                }

                $(this).parent().find('.number').html(count - 1);
            });
        } else {
            $(this).parent().find('.operation').find('.number').html('1');
            $(this).html('КУПИТЬ');
        }
    });

    $('.button_up').on('click', function (e) {
        e.preventDefault();

        $('body,html').animate({
            scrollTop: 0
        }, 400);
    });
});