import { Request, Response, NextFunction } from 'express';
import { StoryDao, IStoryDao } from '@daos/Story/StoryDao';
import type { IStory } from '@entities/Story';

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
    await storyDao.add(req.body);

    // res.send(`created ${story}`);

    res.redirect('/');
  }

  public async getStories(req: Request, res: Response) {
    const stories = await storyDao.getAll();

    console.log('available stories');
    console.log(stories);
    if (req.isAuthenticated()) res.render('stories', { stories });
    else res.redirect('/login');
  }

  public async deletestory(req: Request, res: Response) {
    if (req.isAuthenticated()) {
      await storyDao.delete(req.params.storyId);
      res.redirect('/');
    } else res.redirect('/login');
  }
}

// export async function getAllStories(req: Request, res: Response, next: NextFunction) {}
