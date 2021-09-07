"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryDao = void 0;
const StoryModel_1 = require("@db/Models/StoryModel");
class StoryDao {
    async add(story) {
        // TODO
        const newStory = new StoryModel_1.StoryModel(story);
        await newStory.save();
        return newStory;
    }
    /**
     *
     * @param user
     */
    async update(story) {
        // TODO
        return Promise.resolve(undefined);
    }
    /**
     *
     * @param id
     */
    async delete(id) {
        // TODO
        return Promise.resolve(undefined);
    }
    async getAll() {
        // TODO
        const allStories = StoryModel_1.StoryModel.find({}).lean();
        return allStories;
    }
}
exports.StoryDao = StoryDao;
