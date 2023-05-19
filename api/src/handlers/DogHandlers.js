const { createDog } = require('../controllers/createDog');
const { finalResult } = require('../controllers/getAllDogs');
const getDogById = require('../controllers/getDogById');

const getDogHandler = async (req, res) => {
	try {
		const { name } = req.query;
		const getDogs = await finalResult();
		if (name) {
			const results = getDogs.filter((a) => {
				return a.name.toLowerCase().includes(name.toLowerCase());
			});
			if (results.length) {
				res.status(200).json(results);
				console.log(results);
			} else {
				res.status(400).json({ error: `Dog Breed ${name} not found` });
			}
		} else {
			return res.status(200).json(getDogs);
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getDogByIdHandler = async (req, res) => {
	try {
		const { dogId } = req.params;
		const source = isNaN(dogId) ? 'bdd' : 'api';
		const dog = await getDogById(dogId, source);
		console.log(dog);
		res.status(200).json(dog);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const createDogHandler = async (req, res) => {
	try {
		const { name, image, temperament, height, weight, lifeSpan } = req.body;
		const newDog = await createDog(
			name,
			image,
			temperament,
			height,
			weight,
			lifeSpan,
		);
		res.status(200).json('creado exitosamente');
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = { createDogHandler, getDogHandler, getDogByIdHandler };
