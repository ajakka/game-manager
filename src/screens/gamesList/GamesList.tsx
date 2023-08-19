import "./GamesList.css"
import React from 'react'
import { GameData } from "../../models/GameData";
import { useFiles } from "../../hooks/useFiles";

export const GamesList = () => {
	const [gameData, setGameData] = React.useState<GameData[]>([]);

	const [selectedGameIndex, setSelectedGameIndex] = React.useState<number | undefined>(undefined);
	const [selectedGame, setSelectedGame] = React.useState<GameData | undefined>(undefined);

	const { loadGamesdata, saveChanges } = useFiles();

	React.useEffect(() => {
		openFolder();
	}, []);

	// React.useEffect(() => {
	// 	console.log("selectedGame", selectedGame);
	// }, [selectedGame]);

	const openFolder = async () => {
		const data = await loadGamesdata();
		setGameData(data);
	};


	const onGameClicked = (item: GameData, index: number) => {
		console.log("onClick");
		setSelectedGame(item);
		setSelectedGameIndex(index);
	}

	const onBackToList = () => {
		setSelectedGame(undefined);
		setSelectedGameIndex(undefined);
	}

	const onSavechanges = () => {
		if (selectedGame && selectedGameIndex) {
			saveChanges(selectedGame);

			openFolder();
			// let newGameData = [...gameData];
			// newGameData[selectedGameIndex] = selectedGame;

			setSelectedGame(undefined);
			setSelectedGameIndex(undefined);
			// setGameData(newGameData);
		}
	}

	return (
		<div >
			{!selectedGame ?
				<div className="grid-container">
					{
						gameData.map((item, index) => (
							<div key={index} className="grid-item" onClick={() => onGameClicked(item, index)}>
								<img className="grid-item-image" src={item.cover} alt={item.title} />
								<h4 className="grid-item-title">{item.title || "No title"}</h4>
							</div>
						))
					}
				</div>
				:
				<div>
					<div>
						<button onClick={onBackToList}>Back to list</button>
						<button onClick={onSavechanges}>Save changes</button>

					</div>

					<div>
						<h4 className="input-field" >{selectedGame.path}</h4>
					</div>

					<img className="grid-item" src={selectedGame.cover} alt={selectedGame.title} />

					<div>
						<input
							id="title"
							className="input-field"
							placeholder="title"
							type="text"
							value={selectedGame.title}
							onChange={e => { setSelectedGame({ ...selectedGame, title: e.target.value }) }} />
					</div>

					<div>
						<input
							id="version"
							className="input-field"
							placeholder="version"
							type="text"
							value={selectedGame.version}
							onChange={e => { setSelectedGame({ ...selectedGame, version: e.target.value }) }} />
					</div>

					<div>
						<input
							id="author"
							className="input-field"
							placeholder="author"
							type="text"
							value={selectedGame.author}
							onChange={e => { setSelectedGame({ ...selectedGame, author: e.target.value }) }} />
					</div>

					<div>
						<input
							id="website"
							className="input-field"
							placeholder="website"
							type="text"
							value={selectedGame.website}
							onChange={e => { setSelectedGame({ ...selectedGame, website: e.target.value }) }} />
					</div>

					<div>
						<input
							id="patreon"
							className="input-field"
							placeholder="patreon"
							type="text"
							value={selectedGame.patreon}
							onChange={e => { setSelectedGame({ ...selectedGame, patreon: e.target.value }) }} />
					</div>

					<div>
						<input
							id="itch"
							className="input-field"
							placeholder="itch"
							type="text"
							value={selectedGame.itch}
							onChange={e => { setSelectedGame({ ...selectedGame, itch: e.target.value }) }} />
					</div>

					<div>
						<input
							id="kemono"
							className="input-field"
							placeholder="kemono"
							type="text"
							value={selectedGame.kemono}
							onChange={e => { setSelectedGame({ ...selectedGame, kemono: e.target.value }) }} />
					</div>

					<div>
						<input
							id="f95"
							className="input-field"
							placeholder="f95"
							type="text"
							value={selectedGame.f95}
							onChange={e => { setSelectedGame({ ...selectedGame, f95: e.target.value }) }} />
					</div>
				</div>
			}
		</div>
	)
}