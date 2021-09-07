"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StoryDao_1 = require("@daos/Story/StoryDao");
const storyDao = new StoryDao_1.StoryDao();
/**
 * Get all users.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
// class StoryController:
class StoryController {
    createDialog(req, res, next) {
        res.render('create.handlebars', { layout: 'index' });
    }
    async createStory(req, res, next) {
        console.log(req.body);
        console.log("someone sent!");
        await storyDao.add(req.body);
        // res.send(`created ${story}`);
        res.redirect('/');
    }
    async getStories(req, res) {
        const stories = await storyDao.getAll();
        console.log("req" + req);
        res.render('stories', { stories });
    }
}
exports.default = StoryController;
// export async function getAllStories(req: Request, res: Response, next: NextFunction) {}
