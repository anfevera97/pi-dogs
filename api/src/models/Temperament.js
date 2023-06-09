const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'temperament',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: UUIDV4,
			},

			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'temperament',
		},
	);
};
