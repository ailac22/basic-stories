"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
const storyRoutes_1 = __importDefault(require("./routes/storyRoutes"));
const db_1 = require("./db/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectionString = process.env.MONGODB_URL;
(0, db_1.connectToMongo)(connectionString)
    .then(() => console.log('done'))
    .catch((err) => console.error(err));
// UserModel.find((err,users) => {
//     const u: IUser = users[0];
//     console.log(`mongoose gives ${u}`)
// });
// Boot express
const app = (0, express_1.default)();
const port = 5000;
const engineOptions = {
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    defaultLayout: 'index',
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const viewsDir = path_1.default.join(__dirname, 'views');
app.set('views', viewsDir);
app.set('view engine', 'handlebars');
app.engine('handlebars', (0, express_handlebars_1.default)(engineOptions));
app.use(express_1.default.static('public'));
// Application routing
// app.use('/', (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).send({ data: 'Hello from Ornio AS' });
// });
app.use('/', storyRoutes_1.default);
// app.get('/', (req, res) => {
//   //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
//   res.render('main', {layout : 'index'});
//   });
// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
