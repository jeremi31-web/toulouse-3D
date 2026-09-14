const { app, BrowserWindow } = require('electron');
const path = require('path');

// Lancer le serveur Express en arrière-plan
require('./server.js');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    title: "Toulouse 3D",
    webPreferences: {
      nodeIntegration: false
    }
  });

  // Léger délai pour s'assurer que le serveur Express est prêt
  setTimeout(() => {
    mainWindow.loadURL('http://localhost:3002');
  }, 500);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});