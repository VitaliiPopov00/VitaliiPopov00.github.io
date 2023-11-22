import { artists } from './query.js';

export function getCardHTML(card) {
    return `<li class="card">
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