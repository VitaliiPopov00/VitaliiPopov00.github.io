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

    if (window.location.href.includes('logout')) {
        if (sessionStorage.getItem('login')) {
            sessionStorage.removeItem('login');
            window.location = 'index.html';
        } else {
            window.location = '403.html';
        }
    }

    if (sessionStorage.getItem('login')) {
        $('a.no_auth_user').addClass('no-show');
        $('a.auth_user').removeClass('no-show');
    }

    if ($(window).width() < 960) {
        $('.nav_big_screen').addClass('no-show');
        $('.menu_btn.main').removeClass('no-show');
    } else {
        $('.nav_big_screen').removeClass('no-show');
        $('.menu_btn.main').addClass('no-show');
    }

    $(window).on('resize', function () {
        if ($(window).width() < 960) {
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
    $('.search_input_header').css('top', $('header').outerHeight(true));


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

    $(document).on('click', function (event) {
        if (!$('.search_input_header').hasClass('no-show') && !$(event.target).closest('.search_input_header').length) {
            $('.search_input_header').addClass('no-show');
            $('header, main, footer').removeClass('blur');
        }
    });

    $('.header_search').on('click', function (e) {
        setTimeout(() => {
            e.preventDefault();

            if ($(this).hasClass('header_search_mobile')) {
                $('.menu_btn.main').removeClass('no-show');
                $('.nav_small_screen').slideToggle(0);
            }

            $('header, main, footer').addClass('blur');
            $('.search_input_header').removeClass('no-show');
        }, 1);
    });

    $('.header_input_search').on('input', function (e) {
        if ($(this).val().length > 2) {
            $('.search_list_result').removeClass('no-show');
        } else {
            $('.search_list_result').addClass('no-show');
        }
    });

    $('.login_form>input').on('input', function(e) {
        $(this).removeClass('error').next().text('');
    });

    $('.login_button').on('click', function (e) {
        e.preventDefault();
        let formValue = $(this).parent().serialize().split('&').map(value => value.split('='));

        fetch('../database/user.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                let login = formValue.filter(value => { return value.indexOf('login') != -1 ? true : false })[0][1];
                let password = formValue.filter(value => { return value.indexOf('password') != -1 ? true : false })[0][1];
                let user = data.users.filter(user => {
                    return user.login == login ? true : false;
                });

                if (user.length) {
                    if (user[0].password == password) {
                        sessionStorage.setItem('login', login);
                        window.location = 'index.html';
                    } else {
                        throw { message: "Пароль введен неверно", attributeName: "password" };
                    }
                } else {
                    throw { message: "Пользователь не найден", attributeName: "login" };
                }
            })
            .catch(e => {
                $(`input[name=${e.attributeName}]`).addClass('error');
                $(`.${e.attributeName}_error`).text(e.message);
            });
    });

    $('.register_form>input').on('input', function(e) {
        $(this).removeClass('error').next().text('');
    });

    $('.register_button').on('click', function (e) {
        e.preventDefault();
        let formValue = $(this).parent().serialize().split('&').map(value => value.split('='));

        fetch('../database/user.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                let login = formValue.filter(value => { return value.indexOf('login') != -1 ? true : false })[0][1];
                let email = formValue.filter(value => { return value.indexOf('email') != -1 ? true : false })[0][1];
                let password = formValue.filter(value => { return value.indexOf('password') != -1 ? true : false })[0][1];
                let password_repeat = formValue.filter(value => { return value.indexOf('password_repeat') != -1 ? true : false })[0][1];
                
                let userByLogin = data.users.filter(user => {
                    return user.login == login ? true : false;
                });
                let userByEmail = data.users.filter(user => {
                    return user.email == email ? true : false;
                });

                if (userByEmail.length) {
                    throw { message: "Пользователь с такой почтой уже существует", attributeName: "email" };
                }

                if (userByLogin.length) {
                    throw { message: "Пользователь с таким логином уже существует", attributeName: "login" };
                }
            })
            .catch(e => {
                $(`input[name=${e.attributeName}]`).addClass('error');
                $(`.${e.attributeName}_error`).text(e.message);
            });
    });
});
