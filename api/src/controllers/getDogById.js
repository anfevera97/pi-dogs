const axios = require('axios');
require('dotenv').config();
const { API_URL } = process.env;
const { Dog, Temperaments } = require('../db');

const getDogById = async (dogId, source) => {
	if (source === 'api') {
		const response = await axios.get(`${API_URL}/${dogId}`);
		const dogApi = [response.data];
		const dog = dogApi.map((data) => {
			return {
				name: data.name,
				life_span: data.life_span,
				temperament: data.temperament,
				image: data.reference_image_id,
				height: data.height.metric,
				weight: data.weight.metric,
			};
		});
		return dog;
	} else {
		const bddResponse = await Dog.findByPk(dogId, {
			include: {
				model: Temperaments,
				attributes: ['name'],
			},
		});
		const result = bddResponse;
		return result;
	}
};

module.exports = getDogById;
