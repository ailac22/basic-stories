import { Router } from 'express';
// eslint-disable-next-line import/no-unresolved
import StoryController from '@controllers/storyController';

const storyRouter: Router = Router();
const storyController: StoryController = new StoryController();

storyRouter.get('/add', storyController.createDialog);
storyRouter.get('/', storyController.getStories);

storyRouter.delete('/:storyId', storyController.deletestory);
storyRouter.post('/add', storyController.createStory);

export default storyRouter;
