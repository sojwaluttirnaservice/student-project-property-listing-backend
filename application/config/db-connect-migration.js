const Sequelize = require('sequelize');
const dotenv = require('dotenv')

dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		dialect: 'mysql',
		dialectOptions: {
			charset: 'utf8',
			collate: 'utf8mb4_general_ci',
		},
		host: process.env.DB_HOST,
		define: {
			freezeTableName: true,
		},
	}
)

module.exports = sequelize