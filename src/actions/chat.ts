"use server";

import { ReceivedChatMessageModel } from "@/models/mongo";
import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017"

export const getCurrentChats = async (hostName:string) => {
  const client = new MongoClient(uri, { monitorCommands: true });

  await client.connect()

  try {
    const db = client.db("chats");

    const projection = {_id: 0, timestamp: 1, message: 1, fromName:1}
    const chats = (await db.collection<ReceivedChatMessageModel>(hostName).find().sort({ timestamp: -1 }).project(projection).toArray()) as ReceivedChatMessageModel[];

    return chats;

  } catch (err) {
    console.log(err);
    throw new Error("Internal Error!")
  } finally {
    await client.close();
  }
}

export const storeChat = async (hostName: string, chat: { timestamp: number, message: string, fromName: string }) => {
  const client = new MongoClient(uri, { monitorCommands: true });

  await client.connect();

  try {
    const db = client.db("chats");

    await db.collection(hostName).insertOne(chat as ReceivedChatMessageModel);

  } catch (err) {
    console.log(err);
    throw new Error("Internal Erorr!")
  } finally {
    await client.close();
  }
}

export const deleteAllStreamChats = async (hostName: string) => {
  const client = new MongoClient(uri, { monitorCommands: true});

  try {
    const db = client.db("chats")

    await db.collection(hostName).drop();
    
  } catch (err) {
    console.log(err);
    throw new Error("Internal Error!");
  } finally {
    await client.close();
  }
}