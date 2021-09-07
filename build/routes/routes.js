"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// eslint-disable-next-line import/no-unresolved
const storyController_1 = require("@controllers/storyController");
const storyRouter = (0, express_1.Router)();
storyRouter.get('/add', storyController_1.createStory);
exports.default = storyRouter;
