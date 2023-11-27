import { lastSalesProduct } from './last_sales.js';
import { getCardListHTML } from './product_card_function.js';
import { albums } from './query.js';
import { albumsCounter } from './bestseller.js';

let data = [];
let data2 = [];

lastSalesProduct.forEach(product => {
    data.push(albums.find(album => album.id == product));
});

albumsCounter.forEach(product => {
    data2.push(albums.find(album => album.id == product[0]));
});

$('[data-index-last-sales]').append(getCardListHTML(data));
$('[data-index-beset-seller]').append(getCardListHTML(data2));