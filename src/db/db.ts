// import UserDao from '@daos/User/UserDao.mock';
import { Schema, model, connect, ConnectOptions, Mongoose } from 'mongoose';
// eslint-disable-next-line import/no-unresolved
import { IUser } from '@entities/User';
// eslint-disable-next-line import/no-unresolved
import { IStory } from '@entities/Story';




export async function connectToMongo(connectionString: string): Promise<void> {
  const options: ConnectOptions = {
    //dbName: 'storiesExpress',
  };

  const mongoose = connect(connectionString, options)
    .then(() => console.log('done indeed'))
    .catch((e) => console.log(e));

  await mongoose;
}
