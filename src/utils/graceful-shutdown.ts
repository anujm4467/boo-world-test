import { INestApplication, Logger } from '@nestjs/common';

/**
 * Gracefully shuts down the Nest.js application when termination signals (SIGINT or SIGTERM) are received.
 *
 * @param {INestApplication} app - The Nest.js application instance.
 */
export function gracefulShutdown(app: INestApplication): void {
  const logger = new Logger(gracefulShutdown.name);

  // Listen for termination signals (SIGINT and SIGTERM)
  process.on('SIGINT', () => {
    logger.log('Received SIGINT signal. Closing server...');
    shutdown();
  });

  process.on('SIGTERM', () => {
    logger.log('Received SIGTERM signal. Closing server...');
    shutdown();
  });

  /**
   * Gracefully shuts down the server, closing the Nest.js app and handling errors.
   *
   * @async
   */
  async function shutdown(): Promise<void> {
    try {
      // Close the Nest.js app gracefully
      await app.close();
      logger.log('Nest.js app closed gracefully.');

      // Close the server gracefully
      process.exit(0); // Exit with success code
    } catch (err) {
      // Log an error if there is an issue during graceful shutdown
      logger.error(`Error during graceful shutdown: ${err}`);
      process.exit(1); // Exit with error code
    }
  }
}
