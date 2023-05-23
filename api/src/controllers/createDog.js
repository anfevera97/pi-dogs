const { Dog, Temperament } = require('../db');

const createDog = async (
	name,
	image,
	height,
	weight,
	lifeSpan,
	temperaments,
) => {
	const newDog = await Dog.create({
		name,
		image,
		height,
		weight,
		lifeSpan,
	});

	await newDog.setTemperaments(temperaments);
	return newDog;
};
module.exports = { createDog };
