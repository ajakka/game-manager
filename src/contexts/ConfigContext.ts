import React from "react";
import { ConfigType } from "../models/Config";

export const initialConfig: ConfigType = {
	gamesPath: undefined,
};

export const ConfigContext = React.createContext<{
	config: ConfigType;
	setConfig: React.Dispatch<React.SetStateAction<ConfigType>>;
}>({
	config: initialConfig,
	setConfig: () => undefined,
});
