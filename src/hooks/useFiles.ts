import React from 'react';
import { fs, path } from '@tauri-apps/api';
import { useConfig } from './useConfig';
import noImage from '../assets/cover.png';
import { GameData } from '../models/GameData';

export const useFiles = () => {
	const { config } = useConfig();

	const loadGamesdata = async () => {
		try {
			if (config.gamesPath) {
				const data: GameData[] = [];

				const content = await fs.readDir(config.gamesPath);
				for (let index = 0; index < content.length; index++) {
					const gp = content[index];

					// if item is not a folder, then skip
					if (gp.children === undefined) continue;

					let coverImage: string = '';
					let metaData: GameData = {};

					try {
						const coverU8 = await fs.readBinaryFile(
							await path.join(gp.path, 'cover.png'),
						);
						coverImage = URL.createObjectURL(
							new Blob([coverU8.buffer], { type: 'image/png' }),
						);
					} catch (error) {
						// console.error(error);
						coverImage = noImage;
					}

					try {
						const metaText = await fs.readTextFile(
							await path.join(gp.path, 'data.json'),
						);
						metaData = JSON.parse(metaText);
					} catch (error) {
						// console.error(error);
					}

					data.push({
						...metaData,
						// title: gp.name || "No title",
						cover: coverImage,
						path: gp.path,
					});
				}

				console.log('data', data);

				return data;
			} else return [];
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	const saveChanges = async (data: GameData) => {
		const newData = { ...data };
		const pathStr = newData.path;

		if (pathStr) {
			delete newData.path;
			delete newData.cover;

			const jsonData = JSON.stringify(newData);

			try {
				await fs.writeTextFile(await path.join(pathStr, 'data.json'), jsonData);
			} catch (error) {
				console.error(error);
			}
		}
	};

	return { loadGamesdata, saveChanges };
};
