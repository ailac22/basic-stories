// import UserDao from '@daos/User/UserDao.mock';
import { Schema, model, connect, ConnectOptions, Mongoose, ObjectId } from 'mongoose';
// eslint-disable-next-line import/no-unresolved
import { IUser } from '@entities/User';
// eslint-disable-next-line import/no-unresolved
import { IStory } from '@entities/Story';

export async function connectToMongo(connectionString: string): Promise<Mongoose> {
  const options: ConnectOptions = {};

  return connect(connectionString, options);
}
