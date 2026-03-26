import { MongoClient, type Db } from "mongodb";
import * as dotenv from "dotenv";
import employeeData from "../data/employees.json";

dotenv.config();

interface Employee {
  firstName: string;
  lastName: string;
  headshotUrl: string;
}

interface RawEmployee {
  firstName: string;
  lastName: string;
  headshot?: {
    url?: string;
  };
}

async function seed(): Promise<void> {
  const uri = process.env.MONGO_URI as string;

  if (!uri) {
    throw new Error("MONGO_URI is not defined in .env");
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db: Db = client.db();
    const collection = db.collection<Employee>("employees");

    await collection.drop().catch(() => {});

    const employees: Employee[] = (employeeData as RawEmployee[])
      .filter((p) => p.firstName && p.lastName && p.headshot?.url)
      .map((p) => ({
        firstName: p.firstName,
        lastName:  p.lastName,
        headshotUrl: p.headshot!.url!,
      }));

    const result = await collection.insertMany(employees);
    console.log(`Inserted ${result.insertedCount} documents`);

  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});