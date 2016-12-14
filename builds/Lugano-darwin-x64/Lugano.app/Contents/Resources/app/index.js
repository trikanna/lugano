const {app, electron, protocol, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');

protocol.registerStandardSchemes(['trikanna']);

app.setAsDefaultProtocolClient('trikanna');

app.on('ready', () => {
    if (isDev) {
        require('devtron').install();
    }

    app.on('open-url', function (ev, url) {
        win.webContents.send('urlAction', url.substr(11));
        win.focus();
    });

    let win = new BrowserWindow({
        width: 300,
        height: 360,
        resize: false,
        maximizable: false,
        titleBarStyle: 'hidden-inset'
    });

    win.loadURL(`file://${__dirname}/electron.html`);

    if (isDev) {
        // win.openDevTools({detach: true});
    }

    win.on('closed', () => {
        win = null;
    });

    win.show();
});

app.on('window-all-closed', function () {
    app.quit()
});



