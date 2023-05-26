const { Dog, Temperament } = require('../db');
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
				model: Temperament,
				attributes: ['name'],
			},
		});
		const temperaments = bddResponse.temperaments.map(
			(temperament) => temperament.name,
		);
		const result = { ...bddResponse.toJSON(), temperaments };
		return result;
	}
};

module.exports = getDogById;
