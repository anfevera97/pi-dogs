const { Temperaments } = require('../db');
require('dotenv').config();
const { API_URL } = process.env;
const axios = require('axios');

const Temperament = async () => {
	const temps = await axios.get(API_URL);

	for (const data of temps.data) {
		if (data && data.temperament) {
			const res = data.temperament.split(',');

			for (const temperamentName of res) {
				const trimmedNames = temperamentName.trim();
				await Temperaments.findOrCreate({
					where: {
						name: trimmedNames,
					},
				});
			}
		}
	}
	const result = await Temperaments.findAll();
	return result;
};

module.exports = { Temperament };
