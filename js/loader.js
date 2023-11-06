$(window).ready(function () {
    setTimeout(() => {
        $('.loader').fadeToggle(300, () => {
            $('header, main, footer').animate({
                opacity: 1
            }, 300, 'swing', () => {
                $('header, main, footer').removeClass('opacity');
            });
        });
    }, 150);
});