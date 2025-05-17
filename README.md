# BullMQ MariaDB Example

This example demonstrates how to schedule and execute a MariaDB stored procedure (`compute_daily_total`) using BullMQ (Redis‑backed) in Node.js.

## Installation

1. Install dependencies:
   ```bash
   npm install bullmq ioredis mariadb
   ```

2. Ensure Redis is running locally (default port 6379) and your MariaDB server is accessible.

## Project Structure

Create two scripts:
- `producer.js`   (schedules the repeatable job)
- `worker.js`     (processes the job and calls the procedure)

## Running the Example
