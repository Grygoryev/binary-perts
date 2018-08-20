const userEnvironment = detect.parse(navigator.userAgent);
const userBrowser = userEnvironment.browser.family;

const news = document.getElementsByClassName('news-item');
const newsPhotos = document.getElementsByClassName('news-item__photo');
const offers = document.getElementsByClassName('offers__item');

function fixSafary() {
    for (var i = 0; i < newsPhotos.length; i++) {
        newsPhotos[i].style.minWidth = '120px';
    }

    const screenWidth = window.innerWidth;


    for (var i = 0; i < news.length; i++) {

        if ( screenWidth > 900) {
            news[i].style.width = news[i].offsetWidth + 'px';
        } 
    }

    for (var i = 0; i < offers.length; i++) {
        offers[i].style.width = offers[i].offsetWidth + 'px';
    }
}

if (userBrowser === 'Safari') {
    fixSafary();
}

console.log(userBrowser);
