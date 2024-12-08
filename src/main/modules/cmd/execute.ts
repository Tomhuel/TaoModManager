import { execFile, spawn } from "child_process"
import path from "path"
import fs from 'node:fs';

export async function execute(execPath) {
    const dir = path.dirname(execPath);
    const filename = path.basename(execPath);

    console.log(`Executing ${filename} at ${dir}`);

    execFile(filename, { cwd: dir });
}

export async function spawnProcess(path, detached: boolean = false, workingDir: string | undefined = undefined) {
    try {
        const options = workingDir ? { cwd: workingDir } : {};
        console.log(`Executing ${path} ${workingDir ? `at ${workingDir}` : ''}`);
        if (!fs.existsSync(path)) {
            throw new Error('Executable not found. Please check your configuration.');
        }
        let child = spawn(path, [], { ...options, detached });
        child.unref();
    } catch (error: any) {
        if (error.stdout) {
            console.error('stdout:', error.stdout.toString());
        }
        if (error.stderr) {
            console.error('stderr:', error.stderr.toString());
        }
    }
}