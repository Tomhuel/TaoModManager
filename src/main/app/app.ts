import { electronApp, is, optimizer } from "@electron-toolkit/utils";
import { app, BrowserWindow, dialog, shell } from "electron";
import path from "node:path";
import icon from '../../../resources/icon.png?asset';
import { bootstrap } from "..";
import handleEvent from "../events/eventHandler";
import { autoUpdater } from "electron-updater";

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = false;

export class TaoModManagerApp {

	static readonly app = app;

	static async start() {
		handleEvent();

		// This method will be called when Electron has finished
		// initialization and is ready to create browser windows.
		// Some APIs can only be used after this event occurs.
		app.whenReady().then(() => {

			autoUpdater.checkForUpdates();

			// Set app user model id for windows
			electronApp.setAppUserModelId('com.electron')

			// Default open or close DevTools by F12 in development
			// and ignore CommandOrControl + R in production.
			// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
			app.on('browser-window-created', (_, window) => {
				optimizer.watchWindowShortcuts(window)
			})

			TaoModManagerApp.createWindow()

			app.on('activate', function () {
				// On macOS it's common to re-create a window in the app when the
				// dock icon is clicked and there are no other windows open.
				if (BrowserWindow.getAllWindows().length === 0) TaoModManagerApp.createWindow()
			})
		})

		// Quit when all windows are closed, except on macOS. There, it's common
		// for applications and their menu bar to stay active until the user quits
		// explicitly with Cmd + Q.
		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit()
			}
		});
	}

	static async createWindow() {
		const mainWindow = new BrowserWindow({
			width: 900,
			height: 670,
			minWidth: 530,
			show: false,
			autoHideMenuBar: true,
			icon,
			webPreferences: {
				preload: path.join(__dirname, '../preload/index.js'),
				sandbox: false
			}
		});

		TaoModManagerApp.setupAutoUpdaterListeners(mainWindow);

		mainWindow.on('ready-to-show', async () => {
			mainWindow.show();
			await bootstrap();
		})

		mainWindow.webContents.setWindowOpenHandler((details) => {
			shell.openExternal(details.url)
			return { action: 'deny' }
		});

		// HMR for renderer base on electron-vite cli.
		// Load the remote URL for development or the local html file for production.
		if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
			mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
		} else {
			mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
		}
	}

	private static updateMessage(window: BrowserWindow) {
		window.webContents.send('update-message', 'New Update avaiable. Please restart.');
	}

	public static showError(title: string, message: string) {
		dialog.showErrorBox(title, message);
	}
	public static setupAutoUpdaterListeners(window: BrowserWindow) {
		autoUpdater.on('update-available', () => {
			dialog.showMessageBox({
				type: 'info',
				title: 'Update Available',
				message: 'A new update is available. Do you want to update now?',
				buttons: ['Yes', 'No'],
				defaultId: 0,
				cancelId: 1
			});
			TaoModManagerApp.updateMessage(window);
			autoUpdater.downloadUpdate();
		});

		autoUpdater.on('update-downloaded', () => {
			console.log("update downloaded");
			dialog.showMessageBox({
				type: 'info',
				title: 'Update Ready',
				message: 'The update has been downloaded. Do you want to install it now?',
				buttons: ['Yes', 'Later']
			}).then((result) => {
				if (result.response === 0) {
					autoUpdater.quitAndInstall();
				}
			});
		});

		autoUpdater.on('error', (err) => {
			const error: string = String(err);
			console.error('Error en la actualización automática:', err);
			dialog.showErrorBox('Error de actualización', `Hubo un error al intentar descargar la actualización.`);
			dialog.showErrorBox('Error de actualización', `${error.substring(error.length / 2, error.length)}`);
		});
	}

	public static getVersion() {
		return app.getVersion();
	}
}
