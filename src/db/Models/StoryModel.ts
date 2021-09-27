import { IStory } from '@entities/Story';
import { Schema, model, connect, ConnectOptions, Mongoose, Date } from 'mongoose';

const storySchema = new Schema<IStory>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true },
  // isPublic: { type: Boolean, default: false },
  // createdAt: { type: Date, default: new Date(), required: false }, //TODO: this is not working
});
// new Date('Jul 12 2011'),
export const StoryModel = model<IStory>('Storie', storySchema);
