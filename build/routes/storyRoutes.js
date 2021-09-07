"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// eslint-disable-next-line import/no-unresolved
const storyController_1 = __importDefault(require("@controllers/storyController"));
const storyRouter = (0, express_1.Router)();
const storyController = new storyController_1.default();
storyRouter.get('/add', storyController.createDialog);
storyRouter.get('/', storyController.getStories);
storyRouter.post('/add', storyController.createStory);
exports.default = storyRouter;
