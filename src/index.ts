import 'module-alias/register';
import express, { Application, Request, Response, NextFunction } from 'express';
import ExpressHandlebars from 'express-handlebars';
import { IUser } from '@entities/User';
import path from 'path';
import storyRouter from './routes/storyRoutes';
import { connectToMongo } from './db/db';
import dotenv from 'dotenv'

dotenv.config();

const connectionString: string = process.env.MONGODB_URL as string;

connectToMongo(connectionString)
  .then(() => console.log('done'))
  .catch((err) => console.error(err));

// UserModel.find((err,users) => {
//     const u: IUser = users[0];
//     console.log(`mongoose gives ${u}`)
// });

// Boot express
const app: Application = express();
const port = 5000;

const engineOptions: ExpressHandlebars.ExphbsOptions = {
  layoutsDir: `${__dirname}/views/layouts`,
  partialsDir: `${__dirname}/views/partials`,
  defaultLayout: 'index',
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

app.set('view engine', 'handlebars');
app.engine('handlebars', ExpressHandlebars(engineOptions));

app.use(express.static('public'));

// Application routing
// app.use('/', (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).send({ data: 'Hello from Ornio AS' });
// });

app.use('/', storyRouter);

// app.get('/', (req, res) => {
//   //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
//   res.render('main', {layout : 'index'});
//   });

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
