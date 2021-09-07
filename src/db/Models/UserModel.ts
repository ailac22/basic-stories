import { IUser } from '@entities/User';
import { Schema, model, connect, ConnectOptions, Mongoose } from 'mongoose';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
});

export const UserModel = model<IUser>('User', userSchema);

//  export function getUserModel(){
//     return UserModelSingle;
// }
