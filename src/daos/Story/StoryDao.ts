import type { IStory } from '@entities/Story';
import { StoryModel } from '@db/Models/StoryModel';
import { Query } from 'mongoose';

export interface IStoryDao {
  // getOne: (email: string) => Promise<IUser | null>;
  getAll: () => Promise<IStory[]>;
  add: (story: IStory) => Promise<IStory>;
  update: (story: IStory) => Promise<void>;
  delete: (id: string) => Promise<IStory>;
}

export class StoryDao implements IStoryDao {
  public async add(story: IStory): Promise<IStory> {
    // TODO

    const newStory = new StoryModel(story);
    await newStory.save();
    return newStory;
  }

  /**
   *
   * @param user
   */
  public async update(story: IStory): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }

  /**
   *
   * @param id
   */
  public async delete(id: string): Promise<IStory> {
    // TODO
    return StoryModel.findByIdAndDelete(id).lean();
  }

  public async getAll(): Promise<IStory[]> {
    // TODO
    const allStories = StoryModel.find({}).lean();
    return allStories;
  }
}
