const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');

app.whenReady().then(()=>{
  createWindow();
  createTray();
});

function createTray() {
  tray = new Tray(path.join(__dirname, 'Tic_tac_toe.png'));

  const contextMenu = [
    { label: 'Show App', click: () => mainWindow.show() },
    { label: 'Quit', click: () => app.quit() },
  ];

  tray.setToolTip('Tic Tac Toe');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}


function createWindow() {
  const win = new BrowserWindow({
    width: 350,
    height: 550,
    resizable:false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('index.html');

}



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});



app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});