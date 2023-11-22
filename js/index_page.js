import { lastSalesProduct } from './last_sales.js';
import { getCardListHTML } from './product_card_function.js';
import { albums } from './query.js';

let data = [];

lastSalesProduct.forEach(product => {
    data.push(albums.find(album => album.id == product));
});

$('[data-index-last-sales]').append(getCardListHTML(data));