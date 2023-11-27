import { albums } from './query.js';
import { getCardPageHTML } from './product_card_function.js';

function getUrlVars() {
    let vars = {};
    if (window.location.href.indexOf('?') != -1) {
        let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        for (let i = 0; i < hashes.length; i++) {
            let hash = hashes[i].split('=');
            let hashName = hash[0];
            vars[hashName] = hash[1];
        }

        return vars;
    } else {
        return false;
    }
}

let productID = (getUrlVars()).id;
let product = albums.find(album => album.id == productID);

$('main').html(getCardPageHTML(product));