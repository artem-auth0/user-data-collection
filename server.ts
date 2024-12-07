// server.ts

import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import cron from 'node-cron';
import { exec } from 'child_process';

/**
 * Initialize Next.js App
 */
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

/**
 * Prepare the Next.js app and start the server
 */
app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || '', true);
    handle(req, res, parsedUrl);
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');

    // Schedule the cron job to run every 5 minutes
    cron.schedule('*/5 * * * *', () => {
      console.log('Cron job triggered: Fetching and storing users...');
      // Execute the dataCollector script using Node
      exec('npx tsx src/scripts/dataCollector.ts', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing dataCollector: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`dataCollector stderr: ${stderr}`);
          return;
        }
        console.log(`dataCollector stdout: ${stdout}`);
      });
    });
  });
});