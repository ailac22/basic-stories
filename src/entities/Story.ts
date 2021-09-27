import { Mongoose, ObjectId, Schema } from 'mongoose';

export interface IStory {
  _id?: Schema.Types.ObjectId;
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  // isPublic: boolean;
  // createdAt: Date;
}

// export class Story implements IStory {

//   public id: number;
//   public title: string;
//   public content: string;

// }
