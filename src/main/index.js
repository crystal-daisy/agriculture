import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import path from 'path'
import packageJson from '../../package.json'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`


app.on('ready', () => {

  createWindow();

  // if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
  // 运行APP检测更新。
  checkUpdate();
})

// 检查更新版本
function checkUpdate() {
  // 执行更新检查
  autoUpdater.currentVersion = packageJson.version;
  sendUpdateMessage(packageJson.version)
  autoUpdater.setFeedURL({
    provider: 'generic',
    url: 'http://localhost:9080/downloads/'
  })
  
  autoUpdater.checkForUpdates();
}


//app.on('window-all-closed', () => {
  //if (process.platform !== 'darwin') {
    //app.quit()
  //}
//})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    webPreferences: {
      nodeIntegration: true, // 是否集成 Nodejs
      enableRemoteModule: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  updateHandle();
}

function updateHandle(){
	const os = require('os');
	
	app.allowRendererProcessReuse = true // allowRendererProcessReuse 警告处理
	autoUpdater.autoDownload = false // 关闭自动更新

	//if (process.env.NODE_ENV === 'development') {
	  //autoUpdater.updateConfigPath = path.join(__dirname, 'default-app-update.yml')
	//} else {
	  //autoUpdater.updateConfigPath = path.join(__dirname, '../../../app-update.yml')
	//}
	autoUpdater.updateConfigPath = path.join(__dirname, '../../build/win-unpacked/resources/app-update.yml')
	autoUpdater.on('error', function (error) {     
		sendUpdateMessage('检查更新出错');
		mainWindow.webContents.send('update-error')
	})     
	autoUpdater.on('checking-for-update', function () {
		sendUpdateMessage('正在检查更新……')		
		//mainWindow.webContents.send('checking-for-update') 
	})      
	autoUpdater.on('update-available', function (info) {
		mainWindow.webContents.send('updateAvailable',info); 
		sendUpdateMessage('检测到新版本,问下要不要下载'); 
	})   
	autoUpdater.on('update-not-available', function (info) {
		sendUpdateMessage('现在使用的就是最新版本，不用更新')    
	})    
	// 更新下载进度事件
	autoUpdater.on('download-progress', function (progressObj) {
		console.log("download-progress----------------------------")     
		mainWindow.webContents.send('downloadProgress', progressObj)    
	})   
	// 下载完成   
	autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) { 
		mainWindow.webContents.send('autoUpdater-downloaded');
		ipcMain.on('exit-app', (e, arg) => {
			autoUpdater.quitAndInstall()     
		});         
		sendUpdateMessage('----- 开始更新 isUpdateNow----')    
	});      
	ipcMain.on("checkForUpdate",()=>{
		//执行自动更新检查         
		console.log("执行自动更新检查checked~~~")     
		checkUpdate();
	}) 
	ipcMain.on('autoUpdater-toDownload',()=>{
		autoUpdater.downloadUpdate()
	})
} 
// 通过main进程发送事件给renderer进程，提示更新信息. 
function sendUpdateMessage(text) {
	console.log(text);
}


