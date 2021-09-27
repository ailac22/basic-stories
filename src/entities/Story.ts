import { Mongoose, ObjectId } from 'mongoose';

export interface IStory {
  _id?: string;
  title: string;
  content: string;
  author: string;
  // isPublic: boolean;
  // createdAt: Date;
}

// export class Story implements IStory {

//   public id: number;
//   public title: string;
//   public content: string;

// }
