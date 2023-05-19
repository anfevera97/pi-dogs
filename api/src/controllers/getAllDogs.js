const axios = require('axios');
require('dotenv').config();
const { API_URL } = process.env;
const { Dog, Temperaments } = require('../db');

const getApiDogs = async () => {
	const apiDogs = await axios.get(`${API_URL}`);
	const resultApi = apiDogs.data.map((data) => {
		return {
			id: data.id,
			name: data.name,
			image: data.image.url,
			height: data.height.metric,
			weight: data.weight.metric,
			temperament: data.temperament,
			lifeSpan: data.life_span,
			created: false,
		};
	});
	return resultApi;
};

const getDogsDB = async () => {
	const dogs = await Dog.findAll({
		include: {
			model: Temperaments,
		},
	});

	const results = await dogs.map((data) => {
		return {
			id: data.id,
			name: data.name,
			image: data.image,
			height: data.height,
			weight: data.weight,
			lifeSpan: data.lifeSpan,
			created: true,
		};
	});

	return results;
};

const finalResult = async () => {
	const apiInfo = await getApiDogs();
	const dbInfo = await getDogsDB();
	return [...dbInfo, ...apiInfo];
};

module.exports = { finalResult, getApiDogs };
