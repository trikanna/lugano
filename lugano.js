const {ipcRenderer} = require('electron');

function getJsonFromUrl(url) {
    let query = url;
    let result = {};
    query.split("&").forEach(function (part) {
        let item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

let container;

window.onload = () => {
    container = document.querySelector('.data-container');
    container.style.visibility = 'visible';
};

ipcRenderer.on('urlAction', function (event, data) {

    if (data === 'action=toggleDebug') {
        container.style.visibility == 'visible'
            ? container.style.visibility = 'hidden'
            : container.style.visibility = 'visible';
    }

    container.textContent = JSON.stringify(getJsonFromUrl(data));
});