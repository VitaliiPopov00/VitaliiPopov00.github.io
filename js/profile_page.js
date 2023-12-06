import { sales, albums, order_statuses } from './query.js';
import { getOrderCard } from './product_card_function.js';

$('main.profile').css('min-height', `${$(window).height() - $('header').outerHeight(true)}px`);

if (!sessionStorage.getItem('login')) {
    window.location = '403.html';
}

let user;
let userID;

fetch('../database/users.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        user = data.find(user => user.login == sessionStorage.getItem('login'));
        userID = user.id;
    });


