import { ObjectId } from 'mongodb';

export class ReceivedChatMessageModel {
  constructor(
    public timestamp: number,
    public message: string,
    public fromName: string,
    public id?: ObjectId
  ) {}
}
