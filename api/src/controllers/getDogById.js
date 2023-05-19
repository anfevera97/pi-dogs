const { Dog, Temperaments } = require('../db');
const { getApiDogs } = require('./getAllDogs');

const getDogById = async (dogId, source) => {
	if (source === 'api') {
		const response = await getApiDogs();
		const dogApi = response.filter(
			(dog) => parseInt(dog.id) === parseInt(dogId),
		);
		return dogApi;
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
