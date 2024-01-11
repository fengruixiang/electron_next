const { ipcRenderer, contextBridge } = require('electron');

// 将 `fs` 模块暴露给渲染进程
contextBridge.exposeInMainWorld('fs', require('fs'));

// 将 `path` 模块暴露给渲染进程
contextBridge.exposeInMainWorld('path', require('path'));

// 将 `ipcRenderer` 模块暴露给渲染进程
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);