import { MongoClient, ObjectId } from "mongodb";

const url = process.env.MONGO_URL;
if (!url) {
  throw new Error("Please add connection url");
}
const client = new MongoClient(url);
client.connect();

const db = client.db("warriors-game");

export { client, db, ObjectId };
