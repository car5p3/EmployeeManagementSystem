const cron = require('node-cron');
const Token = require('../models/Token');

const tokenCleanup = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      await Token.deleteMany({ expiresAt: { $lt: new Date() } });
      console.log('Expired tokens cleaned up');
    } catch (err) {
      console.error('Error cleaning up tokens:', err.message);
    }
  });
};

module.exports = { tokenCleanup };