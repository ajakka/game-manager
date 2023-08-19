import "./App.css";
import React from "react";
import { ConfigContext, initialConfig } from "../contexts/ConfigContext";
import { ConfigType, CONFIG_KEY } from "../models/Config";
import { GamesList } from "./gamesList/GamesList";
import ChoosePath from "./choosePath/ChoosePath";

const initializeConfig = (): ConfigType => {
	const stringState = localStorage.getItem(CONFIG_KEY);
	if (stringState) {
		try {
			return JSON.parse(stringState) as ConfigType;
		} catch (error) {
			return initialConfig;
		}
	} else {
		localStorage.setItem(CONFIG_KEY, JSON.stringify(initialConfig));
		return initialConfig;
	}
};

const App = () => {
	const [config, setConfig] = React.useState(() => initializeConfig());

	const renderScreen = () => {
		if (config.gamesPath === undefined) {
			return <ChoosePath />
		}
		else {
			return <GamesList />
		}
	}

	return (
		<ConfigContext.Provider value={{ config, setConfig }}>
			<div className="container">
				{renderScreen()}
			</div>
		</ConfigContext.Provider>

	);
}

export default App;
