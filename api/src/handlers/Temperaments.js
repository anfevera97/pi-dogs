const { Temperament } = require('../controllers/temperamentController');

const temperamentHandler = async (req, res) => {
	try {
		const temperament = await Temperament();
		res.status(200).json(temperament);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = temperamentHandler;
