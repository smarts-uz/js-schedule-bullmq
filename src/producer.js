// ── producer.js ─────────────────────────────
// Schedules a repeatable job named "compute"
// to run daily at 2:00 AM (cron: "0 2 * * *").

const { Queue } = require('bullmq');
const IORedis = require('ioredis');

async function scheduleJob() {
  // Create Redis connection with required BullMQ settings
  const connection = new IORedis({
    maxRetriesPerRequest: null
  });

  // Create a BullMQ queue
  const queue = new Queue('daily-totals', { connection });

  // Add a repeatable job
  await queue.add(
    'compute',            // job name
    {},                   // job data (empty)
    {
      repeat: {
        cron: '*/60 * * * * *', // every 10 seconds
        tz: 'UTC'          // adjust timezone as needed
      },
      removeOnComplete: true,
      removeOnFail: false
    }
  );

  console.log(`[${new Date().toISOString()}] Scheduled compute job with 10-second interval`);
  await connection.quit();
}

scheduleJob().catch(err => console.error(err));

