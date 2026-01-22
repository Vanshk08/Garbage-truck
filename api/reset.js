const cron = require('node-cron');
const { Area } = require('./collection'); // Import models

const startResetTask = () => {
  // Runs every day at midnight
  cron.schedule('0 0 * * *', async () => {
    await Area.updateMany({}, { isCollected: false });
    console.log("System Reset: All areas set to uncollected for the new day.");
  });
};

module.exports = startResetTask;