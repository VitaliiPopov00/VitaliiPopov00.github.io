import { getOrderCardList } from './product_card_function.js';
import { sales } from './query.js';

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
        
        $('.profile_orders_list').html(getOrderCardList(sales.filter(sale => sale.user_id == userID)));
    });


