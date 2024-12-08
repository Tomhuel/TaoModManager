import { MODELIMPORTEREXECUTABLE } from "../../../config/paths";
import { execute, spawnProcess } from "../../../modules/cmd/execute";
import { TaoModManagerApp } from "../../app";
import { getGenshinExecPath } from "../mods/config";

export async function startGame() {
    try {
        let genshinExecPath = await getGenshinExecPath();
        await execute(MODELIMPORTEREXECUTABLE);
        await spawnProcess(genshinExecPath, true);
    } catch (err: string | any) {
        TaoModManagerApp.showError('Error', err);
    }
}