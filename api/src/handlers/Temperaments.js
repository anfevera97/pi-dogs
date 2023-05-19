const { Temperament } = require('../controllers/temperamentController');

const temperamentHandler = async (req, res) => {
	try {
		const newTemperament = await Temperament();
		res.status(200).json(newTemperament);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = temperamentHandler;
