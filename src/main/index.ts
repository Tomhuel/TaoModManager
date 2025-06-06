import { TaoModManagerApp } from "./app/app";
import { APPDIR } from "./config/paths";
import { setupProject } from "./setup/setupDirs";
import { app } from "electron";

export const bootstrap = async () => {
	await setupProject(app);
};

console.log(`Application executing: ${APPDIR}`);
TaoModManagerApp.start();

export { APPDIR };
