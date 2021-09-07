"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
// import UserDao from '@daos/User/UserDao.mock';
const mongoose_1 = require("mongoose");
async function connectToMongo(connectionString) {
    const options = {
    //dbName: 'storiesExpress',
    };
    console.log("voy a connect con" + connectionString);
    const mongoose = (0, mongoose_1.connect)(connectionString, options)
        .then(() => console.log('done indeed'))
        .catch((e) => console.log(e));
    await mongoose;
}
exports.connectToMongo = connectToMongo;
