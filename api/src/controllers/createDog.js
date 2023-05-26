const { Dog, Temperament } = require('../db');

const createDog = async (
	name,
	image,
	height,
	weight,
	lifeSpan,
	temperament,
) => {
	const newDog = await Dog.create({
		name,
		image,
		height,
		weight,
		lifeSpan,
	});

	const getTemperaments = async (temperament) => {
		const temperaments = [];

		for (const t of temperament) {
			const temper = await Temperament.findOne({
				where: { name: t },
			});
			if (temper) {
				temperaments.push(temper);
			}
		}

		return temperaments;
	};

	const temperaments = await getTemperaments(temperament);
	const temperamentIds = temperaments.map((tem) => tem.id);
	await newDog.setTemperaments(temperamentIds);

	const newDogWithTemperaments = await Dog.findByPk(newDog.id, {
		include: Temperament,
	});

	const cleanTemperaments = newDogWithTemperaments.temperaments.map(
		(temp) => temp.name,
	);

	console.log(cleanTemperaments);
	return [{ newDog, temperament: cleanTemperaments }];
};
module.exports = { createDog };
