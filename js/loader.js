$(document).ready(function () {
    setTimeout(() => {
        $('.loader').fadeToggle(300, () => {
            $('header, main, footer').animate({
                opacity: 1
            }, 300, 'swing', () => {
                $('header, main, footer').removeClass('opacity');
                $('header, main, footer').removeAttr('style');
            });
        });
    }, 150);
});