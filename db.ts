import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://Satyam7619:Satyam123@cluster0.v7w7qfj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const db = client.db("record");

export { db };
