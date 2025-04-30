export {};

declare global {
	interface Window {
		electron: {
			decompress: (path: string) => Promise<any>;
			getGenshinPath: () => Promise<string>;
			setGenshinPath: (path: string) => Promise<void>;
			play: () => Promise<void>;
			getMods: () => Promise<any[]>;
			fixModels: () => Promise<void>;
			enableMod: (realModName: string) => Promise<void>;
			disableMod: (realModName: string) => Promise<void>;
			openDir: (path: string) => Promise<void>;
			deleteMod: (realModName: string) => Promise<void>;
			setModName: (realModName: string, name: string) => Promise<void>;
			getVersion: () => Promise<string>;
		};

		bridge: {
			updateMessage: (callback: (event: any, message: any) => void) => void;
		};
	}
}
