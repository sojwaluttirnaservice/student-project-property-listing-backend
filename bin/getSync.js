let sequelize = require('../application/config/db-connect-migration');
const adminSchema = require('../application/schemas/adminSchema');
const callStatsSchema = require('../application/schemas/callStatsSchema');
const propertySchema = require('../application/schemas/propertySchema');
const userSchema = require('../application/schemas/userSchema');








const getSync = () => {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log(
        '\x1b[47m", \x1b[30m%s\x1b[0m',
        'Database has been migrated successfully, you can now start the server.'
      );
      console.log('\x1b[47m", \x1b[30m%s\x1b[0m', 'Use command: npm start (to start the server)');
      process.exit();
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = getSync;
