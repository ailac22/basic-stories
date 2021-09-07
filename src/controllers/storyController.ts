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

  

  public createDialog(req: Request, res: Response, next: NextFunction){

    
    res.render('create.handlebars', { layout: 'index' });

  }

  public async createStory(req: Request, res: Response, next: NextFunction) {


    console.log(req.body);
    console.log("someone sent!");

    await storyDao.add(req.body);
    
    // res.send(`created ${story}`);

    res.redirect('/');

  }

  public async getStories(req: Request, res: Response) {
    const stories = await storyDao.getAll();

    console.log("req" + req);
    res.render('stories', { stories });


  }
}

// export async function getAllStories(req: Request, res: Response, next: NextFunction) {}
