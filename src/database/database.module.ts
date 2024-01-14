import { Global, Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { DB_CONNECTION } from 'src/common/constant/constant';

const logger = new Logger('MongoMemoryServer');
let globalMongoMemoryServer: MongoMemoryServer;

/**
 * A global module providing a MongoDB database connection for the entire application.
 *
 * This module uses the provided MongoDB URL and database name to establish a connection
 * and exports the database connection for injection into other modules.
 *
 * @module
 */
@Global()
@Module({
  providers: [
    {
      // Factory provider to create the MongoDB connection
      provide: DB_CONNECTION,

      // Factory function to create the database connection
      useFactory: async (): Promise<Db> => {
        // Log that the application is connecting to the database
        Logger.log('Connecting to Database');

        /**
         * Check if a global MongoDB Memory Server instance already exists.
         * If not, create a new one.
         */
        if (!globalMongoMemoryServer) {
          globalMongoMemoryServer = await MongoMemoryServer.create({
            instance: {
              dbName: 'boo-world',
            },
          });
        }

        /**
         * Get the connection URI for the MongoDB Memory Server.
         * @see https://nodkz.github.io/mongodb-memory-server/docs/api/mongomemoryserver#geturi
         */
        const uri = globalMongoMemoryServer.getUri();

        logger.debug(
          'Mongoose Memory Server is available on the server at: ' + uri,
        );

        const databaseName = process.env.DATABASE_NAME || 'boo-world';

        // Connect to the MongoDB server
        const client = await MongoClient.connect(uri, {});

        // Log a successful database connection message
        Logger.log('Database Connection Successful');

        // Get the MongoDB database from the connected client
        const database = client.db(databaseName);

        // Return the connected database for injection
        return database;
      },
    },
  ],

  // Export the 'DATABASE_CONNECTION' token for other modules to use
  exports: [DB_CONNECTION],
})
export class DatabaseModule implements OnModuleDestroy {
  // Implement the OnModuleDestroy interface to handle cleanup when the module is destroyed
  async onModuleDestroy() {
    // Close the MongoDB Memory Server and log a message
    if (globalMongoMemoryServer) {
      await globalMongoMemoryServer.stop();
    }

    Logger.log('MongoDB Memory Server stopped');
  }
}
