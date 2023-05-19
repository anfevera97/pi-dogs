const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('dog', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: UUIDV4,
		},
		image: {
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		height: {
			type: DataTypes.STRING,
		},

		weight: {
			type: DataTypes.STRING,
		},

		lifeSpan: {
			type: DataTypes.STRING,
		},
		created: {
			type: DataTypes.JSON,
			defaultValue: true,
		},
	});
};

