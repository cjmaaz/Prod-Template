import { MongoMemoryServer } from 'mongodb-memory-server';

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create({
    binary: {
      version: '7.0.8'
    }
  });
  global.__MONGOINSTANCE = instance;
  process.env.MONGO_DB_LOCAL = instance.getUri();
}
