const {
  app,
  BrowserWindow,
  screen,
  ipcMain,
} = require("electron");
const path = require("path");
const fs = require("fs");
const url = require('url');

let mainWindow = null;

const createWindow = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const indexPath = url.format({
    protocol: 'file',
    pathname: path.join(__dirname, '../.next', 'server', 'pages', 'index.html'),
    slashes: true,
  });

  console.log('indexPath',indexPath)
  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(indexPath);
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(async () => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});


