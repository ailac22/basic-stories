import { IStory } from '@entities/Story';
import { Schema, model, connect, ConnectOptions, Mongoose } from 'mongoose';

const storySchema = new Schema<IStory>({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export const StoryModel = model<IStory>('Storie', storySchema);
