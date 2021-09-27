import { Request, Response, NextFunction } from 'express';
import { StoryDao, IStoryDao } from '@daos/Story/StoryDao';
import { IStory } from '@entities/Story';
import { IUser } from '@entities/User';
// import _ from 'lodash';


const storyDao: IStoryDao = new StoryDao();


/**
 * Get all users.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */

// class StoryController:

export default class StoryController {
  public createDialog(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) res.render('create.handlebars', { layout: 'index' });
    else res.redirect('/login');
  }

  public async createStory(req: Request, res: Response, next: NextFunction) {
    console.log("estamos en create story");

    if (req.isAuthenticated()) {
      const { user } = req;

      console.log("is authenticated");

      const id = user._id as string;
      const story: IStory = { author: id, ...req.body };
      console.log('story to be added');

      console.log(story);

      await storyDao.add(story);

      res.redirect('/');
    } else res.redirect('/login');
  }

  public async getStories(req: Request, res: Response) {

    if (req.isAuthenticated()) {
      let id = req.user._id as string;
      console.log("id");
      console.log(id);

      const stories = await storyDao.getUserStories(id);
      console.log('available stories');
      console.log(stories);
      if (req.isAuthenticated()) res.render('stories', { stories });
      else res.redirect('/login');
    }
  }

  public async deletestory(req: Request, res: Response) {
    if (req.isAuthenticated()) {
      await storyDao.delete(req.params.storyId);
      res.redirect('/');
    } else res.redirect('/login');
  }
}

// export async function getAllStories(req: Request, res: Response, next: NextFunction) {}
