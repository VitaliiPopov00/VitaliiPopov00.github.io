import { albums } from './query.js';
import { getCardPageHTML, getUrlVars } from './product_card_function.js';

let productID = (getUrlVars()).id;
let product = albums.find(album => album.id == productID);

$('main').html(getCardPageHTML(product));

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
});

$('.plus').on('click', function (e) {
    e.preventDefault();

    let count = Number($(this).parent().find('.number').html());
    $(this).parent().find('.number').html(count + 1);
});

$('.minus').on('click', function (e) {
    e.preventDefault();
    let count = Number($(this).parent().find('.number').html());

    if (count == 1) {
        $(this).parent().toggleClass('no-show');
        $(this).parent().parent().find('.product_buy').html('КУПИТЬ').toggleClass('basket_card');
        $(this).parent().find('.number').html('1');
    } else {
        $(this).parent().find('.number').html(count - 1);
    }
});