"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryModel = void 0;
const mongoose_1 = require("mongoose");
const storySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});
exports.StoryModel = (0, mongoose_1.model)('Storie', storySchema);
