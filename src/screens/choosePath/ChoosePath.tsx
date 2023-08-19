import React from "react";
import { dialog, fs } from "@tauri-apps/api";
import { useConfig } from '../../hooks/useConfig';

const ChoosePath = () => {
	const [selectedFolder, setSelectedFolder] = React.useState<string>("")
	const [errorMessage, setErrorMessage] = React.useState<string | undefined>()

	const { changeGamesPath } = useConfig();

	const selectGameFolder = async () => {
		try {
			const path = await dialog.open({ directory: true }) as string;
			setSelectedFolder(path);

			setErrorMessage(undefined);
		} catch (error) {
			setErrorMessage("Error selecting folder, please try again");
		}
	}

	const openFolder = async () => {
		try {
			const content = await fs.readDir(selectedFolder);
			console.log(JSON.stringify(content));

			changeGamesPath(selectedFolder);
			setErrorMessage(undefined);
		} catch (error) {
			setErrorMessage("Looks like that folder doesn't exist, try another one...");
		}
	}

	return (
		<div>
			<div>
				<div style={{ margin: 16 }}>
					<p>Chose your games directory (or type it if you want it to be dynamic)</p>
					<p>type a dot (.) into the input if you want the same directory the app is in</p>
					<p>or two dots (..) to indicate a parent path</p>
				</div>

				<div>
					<input style={{ marginRight: 8, backgroundColor: "darkgray" }} alt="Games path" type="text" value={selectedFolder}></input>
					<button type="button" onClick={() => selectGameFolder()}>
						Select game folder
					</button>
				</div>

				<button style={{ margin: 8 }} type="button" onClick={() => openFolder()}>
					Open selected folder
				</button>
				<p style={{ margin: 0, color: "darkred", fontWeight: "bold" }}>{errorMessage}</p>

			</div>
		</div>
	)
}

export default ChoosePath