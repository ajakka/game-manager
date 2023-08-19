import React from "react";
import { fs, path } from "@tauri-apps/api";
import { Screens } from "../models/Screens";
import { ConfigType, CONFIG_KEY } from "../models/Config";
import { ConfigContext } from "../contexts/ConfigContext";

const persisteConfig = (config: ConfigType) => {
	const stringConfig = JSON.stringify(config);
	localStorage.setItem(CONFIG_KEY, stringConfig);
};

export const useConfig = () => {
	const { config, setConfig } = React.useContext(ConfigContext);

	const changeGamesPath = (gamesPath: string) => {
		const tempConf = { ...config, gamesPath };
		persisteConfig(tempConf);
		setConfig(tempConf);
	};

	return { config, changeGamesPath };
};

const getInitialScreen = async (): Promise<Screens> => {
	const appDir = await path.resourceDir();
	const confFile = await path.join(appDir, "config", "config.json");

	// Initialize configuration if it's the first time, or if config was deleted
	if (!(await fs.exists(confFile))) {
		await fs.createDir(appDir, { recursive: true });
		await fs.writeTextFile(confFile, "{}");
	}

	const config = JSON.parse(await fs.readTextFile(confFile)) as ConfigType;

	if (config && config.gamesPath) {
		return "GAMES_LIST";
	} else {
		return "CHOOSE_PATH";
	}
};
