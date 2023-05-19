const { Dog } = require('../db');

const createDog = async (name, image, temperament, height, weight, lifeSpan) =>
	await Dog.create({
		name,
		image,
		temperament,
		height,
		weight,
		lifeSpan,
	});

module.exports = { createDog };
