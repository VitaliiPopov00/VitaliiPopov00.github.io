import { artists } from './query.js';
import { genres } from './query.js';

export function getCardHTML(card) {
    return `<li class="card" data-product-id="${card.id}">
                <div class="card_img">
                    <a href="product.html?id=${card.id}&"><img src="${card.logo}" alt="${card.title}"></a>
                </div>
                <div class="card_info">
                    <p class="card_title_album_name">
                        ${card.title.toUpperCase()}<br>
                        <span>${artists.find(artist => artist.id == card.artist_id).title.toLowerCase()}</span>
                    </p>
                    <p class="price">
                        ${(Number(card.price)).toLocaleString('ru-RU')}
                    </p>
                    <div class="card_operation">
                        <a href="#" class="card_button">КУПИТЬ</a>
                        <div class="quantity_operation no-show">
                            <a href="#" class="minus">-</a>
                            <p class="number">1</p>
                            <a href="#" class="plus">+</a>
                        </div>
                    </div>
                </div>
            </li>`;
}

export function getCardListHTML(cards) {
    let resultHTML = '<ul class="card_list">';
    
    cards.forEach(card => {
        resultHTML += getCardHTML(card);
    });

    resultHTML += '</ul>';

    return resultHTML;
}

export function getCardPageHTML(card) {
    let result =  `<div class="product" data-product-id="${card.id}">
                        <div class="product_first">
                            <img src="${card.logo}" alt="${card.title}" class="product_img">
                        </div>
                        <div class="product_second">
                            <div class="product_info">
                                <p>АЛЬБОМ<br>
                                    <span>${card.title.toUpperCase()}</span>
                                </p>
                                <p>АРТИСТ / ГРУППА<br>
                                    <a class="link" href="products.html?artistId=${card.artist_id}">${artists.find(artist => artist.id == card.artist_id).title.toUpperCase()}</a>
                                </p>
                                <p>ГОД ВЫПУСКА АЛЬБОМА<br>
                                    <span>${card.year_release_album}</span>
                                </p>
                                <p>ГОД ВЫПУСКА ПЛАСТИНКИ<br>
                                    <span>${card.year_release_plate}</span>
                                </p>
                                <p>ЖАНР<br>`;
    
    card.genres.forEach((genre, index) => {
        result += `<a class="link" href="products.html?genreId=${genre}">${genres.find(genreItem => genreItem.id == genre).title.toUpperCase()}${index != card.genres.length - 1 ? ', ' : ''}</a>`;
    });
                                    
    result += `</p>
                <p>ЦЕНА<br>
                    <span>${(Number(card.price)).toLocaleString('ru-RU')} ₽</span>
                </p>
            </div>
            <div class="product_operation">
                <a href="#" class="product_buy">КУПИТЬ</a>
                <div class="product_count no-show">
                    <a href="#" class="minus">-</a>
                    <a class="number">1</a>
                    <a href="#" class="plus">+</a>
                </div>
            </div>
        </div>
    </div>`;

    return result;
}
