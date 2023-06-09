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
			allowNull: false,
		},

		weight: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		lifeSpan: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		created: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	});
};

