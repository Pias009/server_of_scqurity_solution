import mongoose from 'mongoose';

import { MONGO_URI, PORT } from './config';
import { Server } from 'http';
import { app } from './app';

let server: Server;

const bootstrap = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
    server = app.listen(PORT, () => {
      console.log('app is listening on post', PORT);
    });
  } catch (error) {
    console.log('Error occurred while starting the server', error);
  }
};

bootstrap();

// handling uncaught exception
process.on('uncaughtException', () => {
  console.log('Uncaught exception has occurred, shutting down the server');
  process.exit(1);
});

// handling unhandled rejection
process.on('unhandledRejection', (reason) => {
  console.log('We are facing unhandled rejection, shutting down the server');
  console.error('Unhandled Rejection at:', reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
