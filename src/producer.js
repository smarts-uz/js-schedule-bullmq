// ── producer.js ─────────────────────────────
// Schedules a repeatable job named "compute"
// to run daily at 2:00 AM (cron: "0 2 * * *").

const { Queue } = require('bullmq');
const IORedis = require('ioredis');

async function scheduleJob() {
  // Create Redis connection
  const connection = new IORedis();

  // Create a BullMQ queue
  const queue = new Queue('daily-totals', { connection });

  // Add a repeatable job
  await queue.add(
    'compute',            // job name
    {},                   // job data (empty)
    {
      repeat: {
        cron: '0 2 * * *', // every day at 02:00
        tz: 'UTC'          // adjust timezone as needed
      },
      removeOnComplete: true,
      removeOnFail: false
    }
  );

  console.log('Scheduled daily compute job at 02:00 UTC');
  await connection.quit();
}

scheduleJob().catch(err => console.error(err));

