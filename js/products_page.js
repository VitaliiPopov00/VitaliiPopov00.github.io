import { artists, genres, albums } from './query.js';
import { getCardListHTML } from './product_card_function.js';

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

function getGenreListHTML(genreList) {
    let html = '';

    genreList.forEach(genre => {
        html += `<p data-genre-id="${genre.id}">
                    ${genre.title.toUpperCase()}
                </p>`;
    });

    return html;
}

function getArtistListHTML(artistList) {
    let html = '';

    artistList.forEach(genre => {
        html += `<p data-artist-id="${genre.id}">
                    ${genre.title.toUpperCase()}
                </p>`;
    });

    return html;
}

$('.products_filter_item_list.artist-list').html(getArtistListHTML(artists));
$('.products_filter_item_list.genre-list').html(getGenreListHTML(genres));

$('.products_filter_item_list').on('click', 'p', function (e) {
    let value = $(this).text().trim();
    let dataAttributeName = $(this).data('genreId') ? 'genreId' : 'artistId';
    let dataAttributeValue = $(this).data(dataAttributeName);

    $(this).closest('.products_filter_item').find('.products_filter_item_button > p').html(value).data(dataAttributeName, dataAttributeValue);
});

let attrs = getUrlVars();
let resultSearch = [];

if (attrs) {
    if (attrs['artistId']) {
        if (!resultSearch.length) {
            resultSearch = [...albums.filter(album => album.artist_id == attrs['artistId'])];
        } else {
            resultSearch = resultSearch.filter(album => album.artist_id == attrs['artistId']);
        }
        $('p[data-artist-id=""]').data('artistId', attrs['artistId']).text($(`p[data-artist-id=${attrs['artistId']}]`).text());
    }

    if (attrs['genreId']) {
        if (!resultSearch.length) {
            resultSearch = [...albums.filter(album => album.genres.indexOf(attrs['genreId']) !== -1)];
        } else {
            resultSearch = resultSearch.filter(album => album.genres.indexOf(Number(attrs['genreId'])) !== -1);
        }
        $('p[data-genre-id=""]').data('genreId', attrs['genreId']).text($(`p[data-genre-id=${attrs['genreId']}]`).text());
    }

    if (attrs['start_price']) {
        if (!resultSearch.length) {
            resultSearch = [...albums.filter(album => album.price > (Number(attrs['start_price']) - 1))];
        } else {
            resultSearch = resultSearch.filter(album => album.price > (Number(attrs['start_price']) - 1));
        }
        $('input[data-start-price]').val(attrs['start_price']);
    }

    if (attrs['end_price']) {
        if (!resultSearch.length) {
            resultSearch = [...albums.filter(album => album.price < (Number(attrs['end_price']) + 1))];
        } else {
            resultSearch = resultSearch.filter(album => album.price < (Number(attrs['end_price']) + 1));
        }
        $('input[data-end-price]').val(attrs['end_price']);
    }

    if (attrs['title']) {
        if (!resultSearch.length) {
            resultSearch = [...albums.filter(album => album.title.toLowerCase().includes((attrs['title']).toLowerCase()))];
        } else {
            resultSearch = resultSearch.filter(album => album.title.toLowerCase().includes((attrs['title']).toLowerCase()));
        }
        $('input[data-title]').val(attrs['title']);
    }

    if (!resultSearch.length) {
        $('.filter_result').addClass('no-show');
        $('.filter_result.not-found').removeClass('no-show');
        $('.card_list').addClass('no-show');
    }
}

if (resultSearch.length) {
    $('.products_page').append(getCardListHTML(resultSearch));
} else if (!attrs) {
    $('.products_page').append(getCardListHTML(albums));
}