import { getBasketCard } from './product_card_function.js';
import { albums } from './query.js';

$('.basket').css('min-height', `${$(window).height() - $('header').outerHeight(true)}px`);

function setHTML() {
    let basket = JSON.parse(localStorage.getItem('basketProducts'));
    let products = [];
    let allPriceBasket = 0;

    basket.forEach(product => {
        albums.forEach(album => {
            if (product.productID == album.id) {
                products.push(album);
                allPriceBasket += Number(album.price) * Number(product.count);
            }
        })
    });
    
    if (products.length) {
        let HTML = "";

        products.forEach(product => {
            HTML += getBasketCard(product);
        });

        $('.basket_product_list').html(HTML);
        $('.basket_all_price').html(allPriceBasket.toLocaleString('ru-RU') + ' ₽')
    } else {
        $('.basket_info').hide();
        $('.filter_result').show();
    }
}

setHTML();

$('.basket_product_list').on('click', '.plus', function (e) {
    e.preventDefault();

    let productID = $(this).closest('.basket_product').data('productId');
    let currentBasket = JSON.parse(localStorage.getItem('basketProducts'));
    let currentPorudctInBasket = currentBasket.find(product => product.productID == productID);
    currentPorudctInBasket.count++;

    localStorage.setItem(`basketProducts`, JSON.stringify(currentBasket));
    
    setHTML();
});

$('.basket_product_list').on('click', '.minus', function (e) {
    e.preventDefault();
    let productID = $(this).closest('.basket_product').data('productId');
    let currentBasket = JSON.parse(localStorage.getItem('basketProducts'));
    let currentPorudctInBasket = currentBasket.find(product => product.productID == productID);

    if (currentPorudctInBasket.count == 1) {
        currentBasket = currentBasket.filter(product => product.productID != productID);
    } else {
        currentPorudctInBasket.count--;
        $(this).parent().find('.number').html(currentPorudctInBasket.count);
    }

    localStorage.setItem(`basketProducts`, JSON.stringify(currentBasket));
    setHTML();
});




