import { Db, ObjectId } from "mongodb";

export const mockEmployees = [
  { _id: new ObjectId(), firstName: "Ameir",   lastName: "Al-Zoubi", headshotUrl: "https://example.com/ameir.jpg"   },
  { _id: new ObjectId(), firstName: "Josh",    lastName: "Amer",     headshotUrl: "https://example.com/josh.jpg"    },
  { _id: new ObjectId(), firstName: "Daniel",  lastName: "Atwood",   headshotUrl: "https://example.com/daniel.jpg"  },
  { _id: new ObjectId(), firstName: "Mahreen", lastName: "Azam",     headshotUrl: "https://example.com/mahreen.jpg" },
  { _id: new ObjectId(), firstName: "Jordan",  lastName: "Ball",     headshotUrl: "https://example.com/jordan.jpg"  },
  { _id: new ObjectId(), firstName: "Matthew", lastName: "Baranowski",headshotUrl: "https://example.com/matt.jpg"   },
  { _id: new ObjectId(), firstName: "Ashby",   lastName: "Bowles",   headshotUrl: "https://example.com/ashby.jpg"   },
];

export const seedEmployees = async (db: Db): Promise<void> => {
  await db.collection("employees").insertMany(mockEmployees);
};

export const clearEmployees = async (db: Db): Promise<void> => {
  await db.collection("employees").deleteMany({});
};