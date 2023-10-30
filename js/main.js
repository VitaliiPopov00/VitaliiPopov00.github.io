$(document).ready(function () {
    function getUrlVars() {
        let vars = {};
        if (window.location.href.indexOf('?') != -1) {
            let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

            for (let i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                let hashName = hash[0];
                vars[hashName] = hash[1];
            }

            return vars;
        } else {
            return false;
        }
    }

    if ($(window).width() < 890) {
        $('.nav_big_screen').addClass('no-show');
        $('.menu_btn.main').removeClass('no-show');
    } else {
        $('.nav_big_screen').removeClass('no-show');
        $('.menu_btn.main').addClass('no-show');
    }

    $(window).on('resize', function () {
        if ($(window).width() < 890) {
            $('.nav_big_screen').addClass('no-show');
            $('.menu_btn.main').removeClass('no-show');
        } else {
            $('.nav_big_screen').removeClass('no-show');
            $('.menu_btn.main').addClass('no-show');
            $('.nav_small_screen').addClass('no-show');
        }

        if ($(window).width() > 820) {
            $('.basket_product_operation').css('width', `${$('.basket_section_operation_product').width()}px`);
            $('.basket_product_mobile').hide();
            $('.basket_product').show();
        } else {
            $('.basket_product_operation').removeAttr('style');
            $('.basket_product_mobile').show();
            $('.basket_product').hide();
            $('.basket_product_mobile').removeAttr('style');
        }

        $('.products_page').css('min-height', `${$(window).height() - $('header').outerHeight(true)}px`);
        $('.main_screen').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
        $('.nav_small_screen').css('height', `${$(window).height()}px`);
        $('.basket').css('min-height', `${$(window).height() - $('header').outerHeight(true)}px`);
        $('.login').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
        $('.register').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
    });

    $('.main_screen').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
    $('.card_img').css('height', `${$('.card').width()}px`);
    $('.nav_small_screen').css('height', `${$(window).height()}px`);
    $('.basket').css('min-height', `${$(window).height() - $('header').outerHeight(true)}px`);
    $('.login').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
    $('.register').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
    $('.products_page').css('min-height', `${$(window).height() - $('header').outerHeight(true)}px`);


    if ($(window).width() > 820) {
        $('.basket_product_operation').css('width', `${$('.basket_section_operation_product').width()}px`);
        $('.basket_product_mobile').hide();
    } else {
        $('.basket_product').hide();
        $('.basket_product_mobile').show();
        $('.basket_product_mobile').removeAttr('style');
    }

    $('.menu_btn.main').on('click', () => {
        $('.menu_btn.main').addClass('no-show');
        $('.nav_small_screen').slideToggle(300);
    });

    $('.menu_btn.second').on('click', () => {
        $('.menu_btn.main').removeClass('no-show');
        $('.nav_small_screen').slideToggle(300);
    });

    $('.products_filter_item_list > p').on('click', function (e) {
        let value = $(this).text().trim();
        let dataAttributeName = $(this).data('genreId') ? 'genreId' : 'artistId';
        let dataAttributeValue = $(this).data(dataAttributeName);

        $(this).closest('.products_filter_item').find('.products_filter_item_button > p').html(value).data(dataAttributeName, dataAttributeValue);
    });

    $('.products_filter_item_list_input-price').on('input', function (e) {
        let value = Number($(this).val().replace(/[^0-9]/, ''));
        $(this).val(value.toLocaleString('ru-RU'));
    });

    $('.product_img').on('click', function () {
        $(this).toggleClass('no-show');
        $('.playlist').toggleClass('no-show');
    });

    $('.playlist').on('click', function () {
        $(this).toggleClass('no-show');
        $('.product_img').toggleClass('no-show');
    });

    $('.products_search').on('click', function (e) {
        e.preventDefault();
        let filters = $(this).closest('.products_filter').children('[data_filter_list]');
        let params = '';
        let url = window.location.href;
        let startPrice = Number($('.filter_price_start').val().replace(/\s/g, ''));
        let endPrice = Number($('.filter_price_end').val().replace(/\s/g, ''));
        let filterSearch = $('.products_filter_item_search_input').val().trim();
        startPrice = startPrice ? `start_price=${startPrice}&` : '';
        endPrice = endPrice ? `end_price=${endPrice}&` : '';
        filterSearch = filterSearch ? `title=${filterSearch}&` : '';

        params += startPrice + endPrice + filterSearch;

        if (url.indexOf('?') !== -1) {
            url = url.slice(0, url.indexOf('?'));
        }

        filters.each((index, el) => {
            let filter = Object.entries($(el).find('button > p').data())[0];
            if (filter[1]) {
                params += filter.join('=') + '&';
            }
        });

        if (params) {
            window.location.href = url + '?' + params.slice(0, -1);
        }

    });

    $('.products_filter_item').hover(function () {
        $(this).find('button > svg').animate({ rotate: '+=180deg' }, 200);
        $(this).find('.products_filter_item_list').toggleClass('no-show').animate({ opacity: 1 }, 200, 'swing', function () {
            $(this).toggleClass('opacity');
        });
    }, function () {
        $(this).find('button > svg').animate({ rotate: '-=180deg' }, 200);
        $(this).find('.products_filter_item_list').animate({ opacity: 0 }, 200, 'swing', function () {
            $(this).toggleClass('no-show opacity');
        });
    });

    $('.card_button').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('basket_card');
        $(this).parent().find('.quantity_operation').toggleClass('no-show');

        if ($(this).hasClass('basket_card')) {
            $(this).html('В КОРЗИНЕ');
        } else {
            $(this).parent().find('.quantity_operation').find('.number').html('1');
            $(this).html('КУПИТЬ');
        }
    });

    $('.product_buy').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('basket_card');
        $(this).parent().find('.product_count').toggleClass('no-show');

        if ($(this).hasClass('basket_card')) {
            $(this).html('В КОРЗИНЕ');
        } else {
            $(this).parent().find('.product_count').find('.number').html('1');
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
                $(this).parent().toggleClass('no-show');
                $(this).parent().parent().find('.card_button').html('КУПИТЬ').toggleClass('basket_card');
            } else if ($(this).parent().hasClass('product_count')) {
                $(this).parent().toggleClass('no-show');
                $(this).parent().parent().find('.product_buy').html('КУПИТЬ').toggleClass('basket_card');
            } else {
                $(this).closest('.basket_product').remove();
                $(this).closest('.basket_product_mobile').remove();
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

    if (window.location.href.includes('products')) {
        let attrs = getUrlVars();

        if (attrs) {
            if (attrs['artistId']) {
                $('p[data-artist-id=""]').data('artistId', attrs['artistId']).text($(`p[data-artist-id=${attrs['artistId']}]`).text());
            }

            if (attrs['genreId']) {
                $('p[data-genre-id=""]').data('genreId', attrs['genreId']).text($(`p[data-genre-id=${attrs['genreId']}]`).text());
            }

            if (attrs['start_price']) {
                $('input[data-start-price]').val(attrs['start_price']);
            }

            if (attrs['end_price']) {
                $('input[data-end-price]').val(attrs['end_price']);
            }

            if (attrs['title']) {
                if (attrs['title'] == 'admin_test_test') {
                    $('.filter_result').addClass('no-show');
                    $('.filter_result.not-found').removeClass('no-show');
                    $('.card_list').addClass('no-show');
                } else {
                    $('input[data-title]').val(attrs['title']);
                }
            }
        }
    }

    $('.search_input_header').css('top', $('header').outerHeight(true));
    $('.header_search').on('click', function (e) {
        e.preventDefault();
        $('.search_input_header').toggleClass('no-show');
        $('header, main, footer').toggleClass('blur');
    });

});
