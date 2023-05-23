const { Temperaments } = require('../db');

const createTemperament = async (name) => {
	return await Temperaments.create({
		name,
	});
};

module.exports = { createTemperament };
