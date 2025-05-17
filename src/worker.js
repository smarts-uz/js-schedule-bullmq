// ── worker.js ───────────────────────────────
// Listens for jobs on "daily-totals" queue,
// executes the "compute_daily_total" stored procedure,
// and logs the result.

const { Worker } = require('bullmq');
const mariadb = require('mariadb');
const IORedis = require('ioredis');

// Create a MariaDB pool
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'test',
  connectionLimit: 5
});

// Worker processing function
const worker = new Worker(
  'daily-totals',
  async job => {
    if (job.name === 'compute') {
      let conn;
      try {
        conn = await pool.getConnection();
        await conn.query('CALL compute_daily_total();');
        console.log(
          `[${new Date().toISOString()}] compute_daily_total() executed successfully.`
        );
      } catch (err) {
        console.error('Error in compute job:', err);
        throw err; // ensure BullMQ marks it as failed
      } finally {
        if (conn) conn.release();
      }
    }
  },
  { connection: new IORedis({ maxRetriesPerRequest: null }) }
);

worker.on('completed', job => {
  console.log(`Job ${job.id} completed.`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

console.log('Worker is listening for compute jobs...');
