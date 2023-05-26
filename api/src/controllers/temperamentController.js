const { Temperament } = require('../db');
require('dotenv').config();
const { API_URL } = process.env;
const axios = require('axios');

const Temperaments = async () => {
	const temps = await axios.get(API_URL);
	for (const data of temps.data) {
		if (data && data.temperament) {
			const res = data.temperament.split(',');
			for (const temperamentName of res) {
				const trimmedNames = temperamentName.trim();
				await Temperament.findOrCreate({
					where: {
						name: trimmedNames,
					},
				});
			}
		}
	}
	const result = await Temperament.findAll();

	return result;
};

module.exports = { Temperaments };
