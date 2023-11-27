$(document).ready(function () {
    function setBasicCss() {
        $('.products_page').css('min-height', `${$(window).height() - $('header').outerHeight(true)}px`);
        $('.main_screen').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
        $('.nav_small_screen').css('height', `${$(window).height()}px`);
        $('.basket').css('min-height', `${$(window).height() - $('header').outerHeight(true)}px`);
        $('.login').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
        $('.register').css('height', `${$(window).height() - $('header').outerHeight(true)}px`);
    }

    function addErrorInput(errors) {
        errors.forEach(error => {
            $(`input[name=${error.attributeName}]`).addClass('error');
            $(`.${error.attributeName}_error`).text(error.message);
        });
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

    setBasicCss();
    $('.card_img').css('height', `${$('.card').width()}px`);
    $('.search_input_header').css('top', $('header').outerHeight(true));
    
    $(window).on('resize', function () {
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

        setBasicCss();
    });

    if ($(window).width() > 820) {
        $('.basket_product_operation').css('width', `${$('.basket_section_operation_product').width()}px`);
        $('.basket_product_mobile').hide();
    } else {
        $('.basket_product').hide();
        $('.basket_product_mobile').show();
        $('.basket_product_mobile').removeAttr('style');
    }

    $('.menu_btn').on('click', () => {
        $('.nav_small_screen').slideToggle(300);
    });

    $('.products_filter_item_list_input-price').on('input', function (e) {
        let value = Number($(this).val().replace(/[^0-9]/, ''));
        $(this).val(value.toLocaleString('ru-RU'));
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

    $('.login_form>input').on('input', function (e) {
        $(this).removeClass('error').next().text('');
    });

    $('.login_button').on('click', function (e) {
        e.preventDefault();
        let formValue = $(this).parent().serialize().split('&').map(value => value.split('='));
        let login = formValue.filter(value => { return value.indexOf('login') != -1 ? true : false })[0][1];
        let password = formValue.filter(value => { return value.indexOf('password') != -1 ? true : false })[0][1];
        let errors = [];

        fetch('../database/users.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (!login) {
                    errors.push({ message: "Заполните поле", attributeName: "login" });
                }

                if (!password) {
                    errors.push({ message: "Заполните поле", attributeName: "password" });
                }

                if (!errors.length) {
                    let user = data.filter(user => {
                        return user.login == login ? true : false;
                    });

                    if (user.length) {
                        if (user[0].password == password) {
                            sessionStorage.setItem('login', login);
                            window.location = 'index.html';
                        } else {
                            errors.push({ message: "Пароль введен неверно", attributeName: "password" });
                        }
                    } else {
                        errors.push({ message: "Пользователь не найден", attributeName: "login" });
                    }
                }

                if (errors.length) {
                    throw errors;
                }
            })
            .catch(addErrorInput);
    });

    $('.register_form>input').on('input', function (e) {
        $(this).removeClass('error').next().text('');
    });

    $('.register_button').on('click', function (e) {
        e.preventDefault();
        let formValue = $(this).parent().serialize().split('&').map(value => value.split('='));
        let login = formValue.filter(value => { return value.indexOf('login') != -1 ? true : false })[0][1];
        let email = formValue.filter(value => { return value.indexOf('email') != -1 ? true : false })[0][1].replace('%40', '@');
        let password = formValue.filter(value => { return value.indexOf('password') != -1 ? true : false })[0][1];
        let password_repeat = formValue.filter(value => { return value.indexOf('password_repeat') != -1 ? true : false })[0][1];
        let errors = [];

        fetch('../database/users.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (!login) {
                    errors.push({ message: "Заполните поле", attributeName: "login" });
                }

                if (!email) {
                    errors.push({ message: "Заполните поле", attributeName: "email" });
                }

                if (!password) {
                    errors.push({ message: "Заполните поле", attributeName: "password" });
                }

                if (password && !password_repeat) {
                    errors.push({ message: "Заполните поле", attributeName: "password_repeat" });
                }

                if (!errors.length) {
                    if (password != password_repeat) {
                        errors.push({ message: "Пароли не совпадают", attributeName: "password_repeat" });
                    } else {
                        let userByLogin = data.filter(user => {
                            return user.login == login ? true : false;
                        });
                        let userByEmail = data.filter(user => {
                            return user.email == email ? true : false;
                        });

                        if (userByEmail.length) {
                            errors.push({ message: "Пользователь с такой почтой уже существует", attributeName: "email" });
                        }

                        if (userByLogin.length) {
                            errors.push({ message: "Пользователь с таким логином уже существует", attributeName: "login" });
                        }
                    }
                }

                if (errors.length) {
                    throw errors;
                }
            })
            .catch(addErrorInput);
    });
});
