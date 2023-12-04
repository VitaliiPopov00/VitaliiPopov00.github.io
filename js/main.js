import { artists, albums } from './query.js';
import { getSearchItemHTML } from './product_card_function.js';

$(document).ready(function () {
    function setBasicCss() {
        $('.nav_small_screen').css('height', `${$(window).height()}px`);
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
    $('.search_input_header').css('top', $('header').outerHeight(true));
    $(window).on('resize', setBasicCss);
    

    $('.menu_btn').on('click', () => {
        $('.nav_small_screen').slideToggle(300);
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
        e.preventDefault();
        setTimeout(() => {
            if ($(this).hasClass('header_search_mobile')) {
                $('.menu_btn.main').removeClass('no-show');
                $('.nav_small_screen').slideToggle(0);
            }

            $('header, main, footer').addClass('blur');
            $('.search_input_header').removeClass('no-show');
        }, 1);
    });

    $('.header_input_search').on('input', function (e) {
        if ($(this).val().length > 1) {
            let val = $(this).val().toLowerCase();
            let results = [];
            let html = '';

            albums.forEach(album => {
                if (album.title.toLowerCase().indexOf(val) !== -1) {
                    results.push(album);
                } 
            });

            artists.forEach(artist => {
                if (artist.title.toLowerCase().indexOf(val) !== -1) {
                    results.push(artist);
                } 
            });

            if (results.length) {
                results.forEach(result => {
                    let flag = result.hasOwnProperty('artist_id') ? true : false;
                    html += getSearchItemHTML(result, flag);
                });

                $('.search_list_result').html(html);
            } else {
                $('.search_list_result').html(`<a data-is-artist><li><p>НИЧЕГО НЕ НАЙДЕНО :(</p></li></a>`)
            }

            $('.search_list_result').removeClass('no-show');
        } else {
            $('.search_list_result').addClass('no-show');
        }
    });
});
