import { INestApplication, Logger } from '@nestjs/common';

export function gracefulShutdown(app: INestApplication, logger: Logger) {
  process.on('SIGINT', () => {
    logger.log('Received SIGINT signal. Closing server...');
    shutdown();
  });

  process.on('SIGTERM', () => {
    logger.log('Received SIGTERM signal. Closing server...');
    shutdown();
  });

  async function shutdown() {
    try {
      await app.close();
      logger.log('Nest.js app closed gracefully.');
      process.exit(1);
    } catch (err) {
      logger.error(`Error during graceful shutdown: ${err}`);
      process.exit(1);
    }
  }
}
