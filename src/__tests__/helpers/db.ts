import { MongoClient, Db } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;
let client: MongoClient;
let db: Db;

export const connectTestDB = async (): Promise<Db> => {
  mongo = await MongoMemoryServer.create();
  client = new MongoClient(mongo.getUri());
  await client.connect();
  db = client.db("testdb");
  return db;
};

export const disconnectTestDB = async (): Promise<void> => {
  await client.close();
  await mongo.stop();
};

export const getTestDb = (): Db => db;